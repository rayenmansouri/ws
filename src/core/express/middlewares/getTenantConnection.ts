import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthFailureError } from "../../ApplicationErrors";
import { schoolDocStore } from "../../subdomainStore";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";
import { IMiddlewareFunction } from "./interface";
import { END_USER_ENUM } from "../../../constants/globalEnums";


export const getTenantConnection = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    const tenantId = req.tenantId;
    const schoolSubdomain = schoolDocStore[tenantId]?.subdomain;
    req.school = schoolSubdomain;

    if (!schoolSubdomain) throw new AuthFailureError();

    const connection = await getNewTenantConnection(schoolSubdomain);
    req.DBConnection = connection;
    next();
  },
);

export class GetTenantConnectionMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){}
  canActivate(): boolean {
    return this.routeConfig.isPublic !== true && this.routeConfig.endUser !== undefined && this.routeConfig.endUser !== END_USER_ENUM.MASTER;
  }
  getMiddleware(): Middleware[] {
    return [getTenantConnection];
  }
}
