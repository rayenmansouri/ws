import * as Sentry from "@sentry/node";
import { NextFunction, Response } from "express";
import mongoose, { ClientSession } from "mongoose";
import { Field } from "multer";
import { webMasterRouter } from "../../apps/main/index.routes";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { School } from "../../feature/schools/domain/school.entity";
import { ID } from "../../types/BaseEntity";
import { container } from "../container/container";
import { containerRegistry } from "../container/containerRegistry";
import { APIResponse } from "../responseAPI/APIResponse";
import { schoolDocStore } from "../subdomainStore";
import { BaseController } from "./controllers/BaseController";
import { authorizeAdmin } from "./middlewares/authorize";
import { decodeJWT } from "./middlewares/decodeJWT";
import { getTenantConnection } from "./middlewares/getTenantConnection";
import { getTenantConnectionForPublicRoutes } from "./middlewares/getTenantConnectionForPublic";
import { languageDetectionMiddleware } from "./middlewares/languageDetection";
import { masterAuthentication } from "./middlewares/master.auth";
import { parseQuery } from "./middlewares/queryValidation";
import { disableUploadMiddleware, uploadMiddleware } from "./middlewares/upload";
import { validateSchema, VALIDATION_SOURCE } from "./middlewares/validateSchema";
import { verifyJWT } from "./middlewares/verifyJWT";
import {
  Middleware,
  RouteConfiguration,
  TPlatformEnum,
  TypedRequest,
  TypedRequestOptions,
} from "./types";

export const registerRoute =
  <Options extends TypedRequestOptions>() =>
  <Path extends string>(routeConfig: RouteConfiguration<Options, Path>): void => {
    const middlewares: Middleware[] = [];

    middlewares.push(languageDetectionMiddleware);

    if (!routeConfig.upload) middlewares.push(disableUploadMiddleware);

    if (routeConfig.upload)
      middlewares.push(
        uploadMiddleware(routeConfig.upload.fields as Field[], routeConfig.upload.options),
      );

    if (routeConfig.bodySchema) middlewares.push(validateSchema(routeConfig.bodySchema));

    if (routeConfig.paramSchema)
      middlewares.push(validateSchema(routeConfig.paramSchema, VALIDATION_SOURCE.PARAM));

    if (routeConfig.querySchema) {
      middlewares.push(parseQuery);
      middlewares.push(validateSchema(routeConfig.querySchema, VALIDATION_SOURCE.QUERY));
    }

    if (routeConfig.isPublic === true) middlewares.push(getTenantConnectionForPublicRoutes);

    if (routeConfig.isPublic !== true && routeConfig.endUser === END_USER_ENUM.MASTER)
      middlewares.push(masterAuthentication);

    if (
      routeConfig.isPublic !== true &&
      routeConfig.endUser &&
      routeConfig.endUser !== END_USER_ENUM.MASTER
    )
      middlewares.push(decodeJWT, getTenantConnection, verifyJWT(routeConfig.endUser));

    if (routeConfig.authorization)
      middlewares.push(
        authorizeAdmin(routeConfig.authorization.action, routeConfig.authorization.resource),
      );

    middlewares.push((req, _, next) => {
      if (req.tenantId) {
        Sentry.setTag("school", req.school);
        Sentry.setTag("userId", req.userId);
        Sentry.setTag("userFullName", req.user.fullName);
        Sentry.setTag("userType", routeConfig.endUser);
      }
      next();
    });

    middlewares.push(
      async (req: TypedRequest<TypedRequestOptions>, res: Response, next: NextFunction) => {
        let session: null | ClientSession = null;
        req.userType = routeConfig.endUser;

        try {
          const requestContainer = container.createChild({ defaultScope: "Singleton" });
          const language = req.language;
          if (language) {
            requestContainer.bind("Language").toConstantValue(language);
          }
          req.container = requestContainer;
          requestContainer.bind("School").toConstantValue({
            ...schoolDocStore[req.tenantId],
            _id: schoolDocStore[req.tenantId]?._id?.toString() as ID,
          } as School);
          requestContainer.bind("Connection").toConstantValue(req.DBConnection);

          if (routeConfig.isTransactionEnabled) {
            session = await mongoose.connection.startSession();
            session.startTransaction();
            requestContainer.bind("Session").toConstantValue(session);
          }

          const controller = requestContainer.get(
            routeConfig.controller.uuid as keyof containerRegistry,
          ) as unknown as BaseController<TypedRequestOptions>;

          const apiResponse = await controller.handle(req, res);

          if (session) await session.commitTransaction();

          if (apiResponse instanceof APIResponse) {
            apiResponse.setLanguage(req.language);
            apiResponse.send(res);
          }
        } catch (Error: unknown) {
          if (session) await session.abortTransaction();

          next(Error);
        } finally {
          if (session) await session.endSession();
        }
      },
    );
    //@ts-expect-error - This is needed because the TypedRequest type is not compatible with the express Request type
    webMasterRouter[routeConfig.method](routeConfig.path, ...middlewares);
  };
