import { BaseRepo } from "../../../core/BaseRepo";
import { ID } from "../../../types/BaseEntity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../../authorization/domain/Role.repo";
import { Admin, AdminMetaData } from "./admin.entity";

export abstract class AdminRepo extends BaseRepo<any> {
  abstract listAdmins(
    filter: {
      search?: string;
      isArchived?: boolean;
      isActive?: boolean;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Admin>>;

  abstract findManyByFullNameAndIds: (fullName: string, ids: ID[]) => Promise<Admin[]>;

  abstract removeRoleFromAdmin: (roleId: ID) => Promise<void>;

  abstract findImpersonatedAdmin: () => Promise<Admin | null>;

  abstract getAdminsCountExcludingArchivedAndImpersonated(): Promise<number>;

  abstract findManyByRoleIds(roleIds: ID[]): Promise<Admin[]>;
}
