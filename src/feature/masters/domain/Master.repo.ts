import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../database/mongo/types";
import { ListOptions } from "../../../types/types";
import { Master, MasterMetaData } from "./master.entity";

export abstract class MasterRepo extends BaseRepo<MasterMetaData> {
  abstract listMaster(
    filter: { search?: string },
    options: ListOptions
  ): Promise<ResponseWithPagination<Populate<MasterMetaData, "roles">>>;

  abstract findOneByEmail(email: string): Promise<Master | null>;

  abstract removeRoleFromMaster(roleId: string): Promise<void>;
}
