import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { BankCheck, BankCheckMetaData } from "./bankCheck.entity";

export abstract class BankCheckRepo extends BaseRepo<BankCheckMetaData> {
  abstract listBankChecks(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<BankCheck>>;
}
