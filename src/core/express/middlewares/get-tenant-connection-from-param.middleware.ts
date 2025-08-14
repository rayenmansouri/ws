import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthFailureError } from "../../ApplicationErrors";
import { schoolDocStore } from "../../subdomainStore";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";
import { IMiddlewareFunction } from "./interface";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import logger from "../../Logger";

const getTenantConnectionFromParam = asyncHandlerForMiddleware(
    async (req: TypedRequest, _: Response, next: NextFunction) => {
      const schoolId = (req.params as {schoolId: string}).schoolId; 
      if (!schoolId) throw new AuthFailureError();
      const schoolSubdomain = schoolDocStore[schoolId]?.subdomain as string;
      req.school = schoolSubdomain;
  
      if (!schoolSubdomain) throw new AuthFailureError();
  
      const connection = await getNewTenantConnection(schoolSubdomain);
      logger.info("Created new tenant connection");
      req.DBConnection = connection;
      next();
    },
  );
  
export class GetTenantConnectionFromParamMiddleware implements IMiddlewareFunction {
    constructor(
      private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
    ){}
    canActivate(): boolean {
      return this.routeConfig.isPublic !== true && this.routeConfig.endUser !== undefined && this.routeConfig.endUser !== END_USER_ENUM.MASTER;
    }
    getMiddleware(): Middleware[] {
      return [getTenantConnectionFromParam];
    }
  }
  