import { ID } from "./../../../shared/value-objects/ID.vo";
import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../database/mongo/types";

import { ListOptions } from "../../../types/types";
import { AdminMetaData } from "./admin.entity";

export abstract class AdminRepo extends BaseRepo<AdminMetaData> {
  abstract listAdmins(
    filter: {
      search?: string;
      isArchived?: boolean;
    },
    options: ListOptions
  ): Promise<ResponseWithPagination<AdminMetaData["entity"]>>;

  abstract findManyByFullNameAndIds: (
    fullName: string,
    ids: ID[]
  ) => Promise<AdminMetaData["entity"][]>;

  abstract removeRoleFromAdmin: (roleId: ID) => Promise<void>;

  abstract findImpersonatedAdmin: () => Promise<AdminMetaData["entity"] | null>;

  abstract getAdminsCountExcludingArchivedAndImpersonated(): Promise<number>;

  abstract findManyByRoleIds(roleIds: ID[]): Promise<AdminMetaData["entity"][]>;
}
