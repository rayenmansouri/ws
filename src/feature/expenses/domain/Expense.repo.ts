import { BaseRepo } from "../../../core/BaseRepo";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { ListOptions } from "../../../types/types";
import { Expense, ExpenseMetaData } from "./expense.entity";

export abstract class ExpenseRepo extends BaseRepo<ExpenseMetaData> {
  abstract listExpenses(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Expense>>;
}
