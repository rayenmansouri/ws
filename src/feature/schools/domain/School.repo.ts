import { ID } from "./../../../types/BaseEntity";
import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { School, SchoolMetaData } from "./school.entity";

export abstract class SchoolRepo extends BaseRepo<SchoolMetaData> {
  abstract findOneBySubdomainOrThrow(subdomain: string): Promise<SchoolMetaData["entity"]>;

  abstract listSchools(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<School>>;

  abstract decrementSmsSold(tenantId: ID, smsCount: number): Promise<void>;
}
