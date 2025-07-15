import { BaseRepo } from "../../core/BaseRepo";
import { Populate } from "../../core/populateTypes";
import { ResponseWithPagination } from "../../newDatabase/mongo/types";
import { ID } from "../../types/BaseEntity";
import { ListOptions } from "../../types/types";
import { SupplierMetaData } from "./supplier.entity";

export abstract class SupplierRepo extends BaseRepo<SupplierMetaData> {
  abstract listSuppliersWithExpenses(
    filter: {
      search?: string;
      expenseId?: ID;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SupplierMetaData, "expenses">>>;
}
