import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthFailureError } from "../../ApplicationErrors";
import { organizationDocStore } from "../../subdomainStore";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";
import { IMiddlewareFunction } from "./interface";
import { END_USER_ENUM } from "../../../constants/globalEnums";

const getTenantConnectionFromParam = asyncHandlerForMiddleware(
    async (req: TypedRequest, _: Response, next: NextFunction) => {
      const organizationId = (req.params as {organizationId: string}).organizationId; 
      if (!organizationId) throw new AuthFailureError();
      const organizationSubdomain = organizationDocStore[organizationId]?.subdomain as string;
      req.organization = organizationSubdomain;
  
      if (!organizationSubdomain) throw new AuthFailureError();
  
      const connection = await getNewTenantConnection(organizationSubdomain);
      console.log("created new tenant connection");
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
  