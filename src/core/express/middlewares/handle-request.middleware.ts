import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { IMiddlewareFunction } from "./interface";
import { container } from "../../container/container";
import { schoolDocStore } from "../../subdomainStore";
import { containerRegistry } from "../../container/containerRegistry";
import mongoose, { ClientSession } from "mongoose";
import { ID } from "../../../types/BaseEntity";
import { School } from "../../../feature/schools/domain/school.entity";
import { APIResponse } from "../../responseAPI/APIResponse";
import { BaseController } from "../controllers/BaseController";
import { asyncHandlerForMiddleware } from "./asyncHandler";

export class HandleRequestMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){}
  canActivate(): boolean {
    return true;
  }

  async handleRequest(req: TypedRequest<TypedRequestOptions>, res: Response, next: NextFunction): Promise<void> {
    let session: null | ClientSession = null;
    req.userType = this.routeConfig.endUser;

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

      if (this.routeConfig.isTransactionEnabled !== undefined) {
        session = await mongoose.connection.startSession();
        session.startTransaction();
        requestContainer.bind("Session").toConstantValue(session);
      }

      const controller = requestContainer.get(
        this.routeConfig.controller.uuid as keyof containerRegistry,
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
  }

  getMiddleware(): Middleware[] {
    return [asyncHandlerForMiddleware(this.handleRequest)];
  }
}