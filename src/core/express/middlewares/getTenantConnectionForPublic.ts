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
    const schoolSubdomain = req.query.schoolSubdomain as string;

    const school = getSchoolFromSubdomain(schoolSubdomain);

    if (!school) {
      next();
      return;
    }

    const connection = await getNewTenantConnection(schoolSubdomain);
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
