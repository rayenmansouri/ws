import { NextFunction, Response } from "express";
import { Role } from "../../../feature/authorization/domain/role.entity";
import { ForbiddenError } from "../../ApplicationErrors";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { AuthorizationService } from "../../../feature/authorization/domain/Authorization.service";
import { TActionsEnum, TResourcesEnum } from "../../../constants/ActionsResource";
import { IMiddlewareFunction } from "./interface";

export const authorizeAdmin = (action: TActionsEnum, resource: TResourcesEnum): Middleware =>
  asyncHandlerForMiddleware((req: TypedRequest, _: Response, next: NextFunction) => {
    const user = req.user as unknown as { roles: Role[] };

    const isAllowed = AuthorizationService.isActionAllowed(user, action, resource);

    if (!isAllowed) throw new ForbiddenError();

    next();
  });


export class AuthorizeMiddleware implements IMiddlewareFunction {
  constructor(
    private routeConfig: RouteConfiguration<TypedRequestOptions, string> 
  ){}
  canActivate(): boolean {
    return this.routeConfig.authorization !== undefined;
  }

  getMiddleware(): Middleware[] {
    if(this.routeConfig.authorization !== undefined){
      return [authorizeAdmin(this.routeConfig.authorization.action, this.routeConfig.authorization.resource)];
    }
    return [];
  }
}