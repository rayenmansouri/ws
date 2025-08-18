import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { container } from "../../container/container";
import { organizationDocStore } from "../../subdomainStore";
import mongoose, { ClientSession } from "mongoose";
import { APIResponse } from "../../responseAPI/APIResponse";
import { BaseController } from "../controllers/BaseController";
import { CONNECTION_POOL_IDENTIFIER, CURRENT_CONNECTION_IDENTIFIER, DATABASE_SERVIßE_IDENTIFIER } from "../../database/constant";
import { DatabaseService } from "../../database/database.service";
import { MASTER_USER_TENANT_ID } from "../../../feature/user-management/master/domain/master.entity";

export class HandleRequestMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){
  }

  canActivate(): boolean {
    return true;
  }

async handleRequest(req: TypedRequest<TypedRequestOptions>, res: Response, next: NextFunction): Promise<void> {
    let session: null | ClientSession = null;
    req.userType = this.routeConfig.endUser;
    try {
      const databaseService = container.get<DatabaseService>(DATABASE_SERVIßE_IDENTIFIER);
      const organization = databaseService.getOrganization(req.tenantId);
      const requestContainer = container.createChild({ defaultScope: "Singleton" });

      requestContainer.bind("Organization").toConstantValue(organization);
      requestContainer.bind(CONNECTION_POOL_IDENTIFIER).toConstantValue(databaseService.getConnectionPool());
      requestContainer.bind(CURRENT_CONNECTION_IDENTIFIER).toConstantValue(req.currentConnection || MASTER_USER_TENANT_ID);

      const language = req.language;
      if (language) {
        requestContainer.bind("Language").toConstantValue(language);
      }
      req.container = requestContainer;


      if (this.routeConfig.isTransactionEnabled !== undefined) {
        session = await mongoose.connection.startSession();
        session.startTransaction();
        requestContainer.bind("Session").toConstantValue(session);
      }

      const controller = requestContainer.get<BaseController<TypedRequestOptions>>(
        this.routeConfig.controller.identifier as string,
      );

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
  }

  getMiddleware(): Middleware[] {
    return [this.handleRequest.bind(this)];
  }
}