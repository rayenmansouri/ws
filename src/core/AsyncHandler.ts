import { NextFunction, Response } from "express";
import { omit } from "lodash";
import { TEndUserEnum } from "../constants/globalEnums";
import { ProtectedRequest } from "../types/app-request";
import { Controller, Middleware, RouteContext, RouteTranslation } from "./Routes/createRoutes";
import { ApplicationError, BadRequestError } from "./ApplicationErrors";
import { IUser } from "../types/entities";
import { container } from "./container/container";
import { Organization } from "../feature/organization-magement/domain/organization.entity";
import { ID } from "../types/BaseEntity";
import { schoolDocStore } from "./subdomainStore";
import { APIErrorResponse } from "./responseAPI/APIErrorResponse";
import { DatabaseService } from "./database/database.service";
import { DATABASE_SERVIßE_IDENTIFIER } from "./database/constant";

export const AsyncHandlerForController = (
  controller: Controller<any>,
  translation?: RouteTranslation<any>[],
  endUser?: TEndUserEnum,
) => {
  return async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
      const requestContainer = container.createChild({ defaultScope: "Singleton" });
      const databaseService = container.get<DatabaseService>(DATABASE_SERVIßE_IDENTIFIER);
      const organization =  databaseService.getOrganization(req.tenantId);
      if(!organization) throw new BadRequestError("global.organizationNotFound");
      requestContainer.bind("Organization").toConstantValue(organization);
      requestContainer.bind("Connection").toConstantValue(req.newConnection);

      const routeContext: RouteContext<any> = {
        connection: req.conn,
        body: req.body,
        files: req.files,
        params: req.params,
        query: { ...omit(req.query, "export") },
        tenantId: req.tenantId,
        user: req.user as unknown as IUser,
        language: req.language,
        session: null,
        headers: { ["user-agent"]: req.headers["user-agent"] as string },
        endUser,
        container: requestContainer,
      };
      const apiResponse = await controller(routeContext);

      if (apiResponse) {
        apiResponse.setLanguage(req.language);
        if (translation) apiResponse.setTranslation(translation);
        apiResponse.send(res);
      }
    } catch (Error: unknown) {
      if (Error instanceof ApplicationError) {
        const apiErrorResponse = new APIErrorResponse(Error);
        apiErrorResponse.setLanguage(req.language);
        if (translation) apiErrorResponse.setTranslation(translation);
        next(apiErrorResponse);
        return;
      }
      next(Error);
    }
  };
};

export const AsyncHandlerForMiddleware = (middleware: Middleware): Middleware => {
  return async (req: ProtectedRequest, res: Response, next: NextFunction) => {
    try {
      await middleware(req, res, next);
    } catch (Error: unknown) {
      if (Error instanceof ApplicationError) {
        const apiErrorResponse = new APIErrorResponse(Error);
        apiErrorResponse.setLanguage(req.language);
        next(apiErrorResponse);
        return;
      }
      next(Error);
    }
  };
};
