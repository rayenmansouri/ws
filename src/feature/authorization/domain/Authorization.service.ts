import { TActionsEnum, TResourcesEnum } from "../../../constants/ActionsResource";
import { Role, SUPER_ADMIN_ROLE } from "./role.entity";
import { RoleService } from "./Role.service";

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
