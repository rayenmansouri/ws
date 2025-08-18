import { NextFunction, Response } from "express";
import {
  getNewTenantConnection,
  getSchoolFromSubdomain,
} from "../../../database/connectionDB/tenantPoolConnection";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { IMiddlewareFunction } from "./interface";

export const getTenantConnectionForPublicRoutes = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    //@ts-expect-error - This is needed to not complicate the type
    const organizationSubdomain = req.query.organizationSubdomain as string;

    const school = getSchoolFromSubdomain(organizationSubdomain);

    if (!school) {
      next();
      return;
    }

    const connection = await getNewTenantConnection(organizationSubdomain);
    req.DBConnection = connection;

    next();
  },
);

export class GetTenantConnectionForPublicRoutesMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){}
  canActivate(): boolean {
    return this.routeConfig.isPublic === true;
  }

  getMiddleware(): Middleware[] {
    return [getTenantConnectionForPublicRoutes];
  }
}
