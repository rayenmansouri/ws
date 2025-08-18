import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthFailureError } from "../../ApplicationErrors";
import { organizationDocStore } from "../../subdomainStore";
import { getNewTenantConnection } from "../../../database/connectionDB/tenantPoolConnection";
import { IMiddlewareFunction } from "./interface";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { BASE_USER_REPOSITORY_IDENTIFIER } from "../../../feature/user-management/constants";
import { UserRepository } from "../../../feature/user-management/base-user/domain/base-user.repository";
import { container } from "../../container/container";


export const getTenantConnection = asyncHandlerForMiddleware(
  async (req: TypedRequest, _: Response, next: NextFunction) => {
    const tenantId = req.tenantId;
    const organizationSubdomain = organizationDocStore[tenantId]?.subdomain;
    req.organization = organizationSubdomain;

    if (!organizationSubdomain) throw new AuthFailureError();

    const connection = await getNewTenantConnection(organizationSubdomain);
    req.DBConnection = connection;
    req.currentConnection = organizationSubdomain as string;
    //check if the user belongs to the tenant
    const userRepository = container.get<UserRepository>(BASE_USER_REPOSITORY_IDENTIFIER);
    userRepository.switchConnection(organizationSubdomain as string);
    const user = await userRepository.findOne({_id:req.userId});
    if(!user) throw new AuthFailureError();
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
