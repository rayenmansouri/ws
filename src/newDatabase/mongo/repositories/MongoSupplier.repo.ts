import { injectable } from "inversify";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { SupplierMetaData } from "../../../feature/supplier/supplier.entity";
import { SupplierRepo } from "../../../feature/supplier/Supplier.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../types";
import { ListOptions } from "../../../types/types";

@injectable()
export class MongoSupplierRepo extends MongoBaseRepo<SupplierMetaData> implements SupplierRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "supplier", session);
  }

  async listSuppliersWithExpenses(
    filter: {
      search?: string;
      expenseId?: string;
    },
    options: ListOptions,
  ): Promise<ResponseWithPagination<Populate<SupplierMetaData, "expenses">>> {
    const filterQuery: FilterQuery<SupplierMetaData["entity"]> = {};

    if (filter.search) filterQuery.name = { $regex: filter.search, $options: "i" };

    if (filter.expenseId) filterQuery.expenses = { $in: [filter.expenseId] };

    const response = await this.findManyWithPagination(filterQuery, {
      populate: ["expenses"],
      ...options,
    });

    return response;
  }
}
