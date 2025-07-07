import { TActionsEnum, TResourcesEnum } from "../../../constants/ActionsResource";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { Role, RoleMetaData } from "./role.entity";

export abstract class RoleRepo extends BaseRepo<RoleMetaData> {
  abstract findAdminRoleByIdsOrThrow(ids: ID[]): Promise<Role[]>;

  abstract findTeacherRoleByIdsOrThrow(ids: ID[]): Promise<Role[]>;

  abstract findMasterRoleByIdsOrThrow(ids: ID[]): Promise<Role[]>;

  abstract findSuperAdminRoleOrThrow(): Promise<Role>;

  abstract findRolesByPermission(action: TActionsEnum, resource: TResourcesEnum): Promise<Role[]>;

  abstract listRoles(
    filter: { search?: string; userTypes?: TEndUserEnum[]; language?: TLanguageEnum },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Role>>;
}
