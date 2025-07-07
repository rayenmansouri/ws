import {
  ACTION_ENUM,
  RESOURCES_ENUM,
  TActionsEnum,
  TResourcesEnum,
} from "../../../constants/ActionsResource";
import { BadRequestError } from "../../../core/ApplicationErrors";

export class RoleService {
  constructor() {}

  static formatPermission(action: TActionsEnum, resource: TResourcesEnum): string {
    return `${action}.${resource}`;
  }

  static ensurePermissionsAreValid(permissions: string[]): void {
    let isValid = true;

    for (const permission of permissions) {
      const [action, resource] = permission.split(".");

      if (!action || !resource) isValid = false;

      if (!Object.values(ACTION_ENUM).includes(action as TActionsEnum)) isValid = false;

      if (!Object.values(RESOURCES_ENUM).includes(resource as TResourcesEnum)) isValid = false;

      if (!isValid) throw new BadRequestError("roleManagement.permissionNotValid");
    }
  }
}
