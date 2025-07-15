import { Connection } from "mongoose";
import { TActionsEnum, TResourcesEnum } from "../../../constants/ActionsResource";
import { container } from "../../../core/container/container";
import { crudRepo } from "../../../database/repositories/crud.repo";
import { ID } from "../../../types/BaseEntity";

// this will be deleted after refactor of the anouncement feature
export const getAdminIdsByPermissions = async (
  connection: Connection,
  action: TActionsEnum,
  resource: TResourcesEnum,
): Promise<ID[]> => {
  const roleRepo = container.get("RoleRepo");

  const authorizedAdminRoles = await roleRepo.findRolesByPermission(action, resource);

  const rolesIds = authorizedAdminRoles.map(role => role._id);

  const admins = await crudRepo(connection, "admin").findMany({
    roles: { $in: rolesIds },
    isImpersonation: false,
    isArchived: false,
  });

  const adminsIds = admins.map(admin => admin._id.toString() as ID);

  return adminsIds;
};
