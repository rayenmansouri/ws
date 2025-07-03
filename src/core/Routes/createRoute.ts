import * as Sentry from "@sentry/node";
import { Router } from "express";
import multer, { Field } from "multer";
import { ZodObject, ZodTypeAny } from "zod";
import { END_USER_ENUM } from "../../constants/globalEnums";
import { authorize } from "../../middlewares/authorize";
import { decodeJWT } from "../../middlewares/decodeJWT";
import { getTenantConnection } from "../../middlewares/getTenantConnection";
import { masterAuthentication } from "../../middlewares/master/master.auth";
import { translationMiddleware } from "../../middlewares/translation";
import { verifyJWT } from "../../middlewares/verifyJWT";
import { AsyncHandlerForController } from "../AsyncHandler";
import { controllerWithTransaction } from "../controllerWithTransaction";
import { uploadMiddleware } from "../express/middlewares/upload";
import { VALIDATION_SOURCE } from "../express/middlewares/validateSchema";
import { logCompilationErrorAndExitProcess } from "../logErrorAndExitProcess";
import { validateRequest } from "../validator";
import { Controller, Middleware, RouteConfig } from "./createRoutes";
import { parseQuery } from "../express/middlewares/queryValidation";

export const createRoutes = (router: Router, ...routeConfigs: RouteConfig<any, any>[]): void => {
  for (const routeConfig of routeConfigs) {
    const middlewares: (Middleware | Controller<any>)[] = [];

    middlewares.push(translationMiddleware);

    if (!routeConfig.upload) {
      middlewares.push(multer().none());
    }

    if (routeConfig.upload) {
      middlewares.push(
        uploadMiddleware(routeConfig.upload.fields as Field[], routeConfig.upload.options),
      );
    }

    if (routeConfig.bodySchema) middlewares.push(validateRequest(routeConfig.bodySchema));

    if (routeConfig.paramSchema) {
      validateParamSchemaAndPath(routeConfig.paramSchema, routeConfig.path);
      middlewares.push(validateRequest(routeConfig.paramSchema, VALIDATION_SOURCE.PARAM));
    }

    if (routeConfig.querySchema) {
      middlewares.push(parseQuery);
      middlewares.push(validateRequest(routeConfig.querySchema, VALIDATION_SOURCE.QUERY));
    }

    if (!routeConfig.isPublic) {
      if (!routeConfig.endUser) {
        logCompilationErrorAndExitProcess(
          new Error("End user is required when the route is not public!"),
        );
        return;
      }

      if (!routeConfig.isPublic && routeConfig.endUser === END_USER_ENUM.MASTER)
        middlewares.push(masterAuthentication);

      if (routeConfig.endUser !== END_USER_ENUM.MASTER)
        middlewares.push(decodeJWT, getTenantConnection, verifyJWT(routeConfig.endUser));
    }

    middlewares.push((req, _, next) => {
      if (req.tenantId) {
        Sentry.setTag("school", req.school);
        Sentry.setTag("userId", req.userId);
        Sentry.setTag("userFullName", req.user.fullName);
        Sentry.setTag("userType", routeConfig.endUser);
      }
      next();
    });

    if (routeConfig.authorization) {
      if (
        routeConfig.endUser !== END_USER_ENUM.ADMIN &&
        routeConfig.endUser !== END_USER_ENUM.TEACHER
      )
        logCompilationErrorAndExitProcess(
          new Error("Authorization can only be set when end user is admin"),
        );

      middlewares.push(
        authorize(routeConfig.authorization.action, routeConfig.authorization.resource),
      );
    }

    if (routeConfig.withTransaction === true) {
      const controller = controllerWithTransaction(routeConfig.controller);
      middlewares.push(
        AsyncHandlerForController(controller, routeConfig.translations, routeConfig.endUser),
      );
    } else {
      middlewares.push(
        AsyncHandlerForController(
          routeConfig.controller,
          routeConfig.translations,
          routeConfig.endUser,
        ),
      );
    }

    router[routeConfig.method](routeConfig.path, ...middlewares);
  }
};

const validateParamSchemaAndPath = (paramSchema: ZodTypeAny, path: string): void => {
  const extractedParamsFromPath = path.split("/:");
  extractedParamsFromPath.shift();

  if (extractedParamsFromPath.length === 0) {
    logCompilationErrorAndExitProcess(
      new Error("A params schema is provided but the giving path contains no params"),
    );
  }

  const extractedParamsFromParamSchema = Object.keys((paramSchema as ZodObject<any>).shape);
  if (extractedParamsFromParamSchema.length !== extractedParamsFromPath.length) {
    logCompilationErrorAndExitProcess(
      new Error("The params schema is incompatible with the given path"),
    );
  }

  for (let i = 0; i < extractedParamsFromPath.length; i++) {
    const paramStringFromPath = extractedParamsFromPath[i];
    const actualParamFromPath = paramStringFromPath.split("/")[0];

    const doesParamFromPathExistInSchema =
      extractedParamsFromParamSchema.includes(actualParamFromPath);

    if (!doesParamFromPathExistInSchema) {
      logCompilationErrorAndExitProcess(
        new Error("The params schema is incompatible with the given path"),
      );
    }
  }
};
