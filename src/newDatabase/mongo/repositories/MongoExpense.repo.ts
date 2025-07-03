import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Expense, ExpenseMetaData } from "../../../feature/expenses/domain/expense.entity";
import { ExpenseRepo } from "../../../feature/expenses/domain/Expense.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

@injectable()
export class MongoExpenseRepo extends MongoBaseRepo<ExpenseMetaData> implements ExpenseRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "expense", session);
  }

  async listExpenses(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Expense>> {
    const filterQuery: FilterQuery<Expense> = {};

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    const data = await this.findManyWithPagination(filterQuery, options);

    return data;
  }
}
