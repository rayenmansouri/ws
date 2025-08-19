import { NextFunction, Response } from "express";
import { Middleware, RouteConfiguration, TypedRequest, TypedRequestOptions } from "../types";
import { asyncHandlerForMiddleware } from "./asyncHandler";
import { ACTION_ENUM, RESOURCES_ENUM, TActionsEnum, TResourcesEnum } from "../../../constants/ActionsResource";
import { IMiddlewareFunction } from "./interface";
import { BadRequestError, ForbiddenError } from "../../ApplicationErrors";
import { Role } from "../../../feature/roles/role.entity";
import { SUPER_ADMIN_ROLE } from "../../../feature/roles/constant";



export class RoleService {
  constructor() {}

  static formatPermission(action: TActionsEnum, resource: TResourcesEnum): string {
    return `${action}_${resource}`;
  }

  static ensurePermissionsAreValid(permissions: string[]): void {
    let isValid = true;

    for (const permission of permissions) {
      const [action, resource] = permission.split("_");

      if (!action || !resource) isValid = false;

      if (!Object.values(ACTION_ENUM).includes(action as TActionsEnum)) isValid = false;

      if (!Object.values(RESOURCES_ENUM).includes(resource as TResourcesEnum)) isValid = false;

      if (!isValid) throw new BadRequestError("roleManagement.permissionNotValid");
    }
  }
}

export class AuthorizationService {
  constructor() {}

  static isSuperAdmin(user: { roles: Role[] }): boolean {
    return user.roles.some(role => role.name === SUPER_ADMIN_ROLE);
  }

  static isActionAllowed(
    user: { roles: Role[] },
    action: TActionsEnum,
    resource: TResourcesEnum,
  ): boolean {
    if (this.isSuperAdmin(user)) return true;

    const permission = RoleService.formatPermission(action, resource);
    const hasPermission = user.roles.some(role => {
      return role.permissions.includes(permission);
    });
    if (hasPermission) return true;

    return false;
  }
}

export const authorizeAdmin = (action: TActionsEnum, resource: TResourcesEnum): Middleware =>
  asyncHandlerForMiddleware((req: TypedRequest, _: Response, next: NextFunction) => {
    const user = req.currentUser as unknown as { roles: Role[] };
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