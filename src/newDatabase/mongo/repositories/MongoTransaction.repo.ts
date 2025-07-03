import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Transaction, TransactionMetaData } from "../../../feature/transactions/transaction.entity";
import { TransactionRepo } from "../../../feature/transactions/transaction.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { Populate } from "../../../core/populateTypes";
import { AdminMetaData } from "../../../feature/admins/domain/admin.entity";
import { Level } from "../../../feature/levels/domains/level.entity";
import { Supplier } from "../../../feature/supplier/supplier.entity";
import { TTransactionTypeEnum } from "../../../features/finance/types/getTransactionDashboard.types";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";

export class MongoTransactionRepo
  extends MongoBaseRepo<TransactionMetaData>
  implements TransactionRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "transaction", session);
  }

  async findManyByLevel(levelId: ID): Promise<TransactionMetaData["entity"][]> {
    return this.model.find({ level: levelId });
  }

  async getTransactionsBySuppliers(supplierIds: ID[]): Promise<TransactionMetaData["entity"][]> {
    const supplier = await this.model.find({ supplier: { $in: supplierIds } });
    return supplier;
  }

  async listTransactions(
    filter: { search?: string; transactionType?: TTransactionTypeEnum; level?: ID },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Omit<Transaction, "admin" | "level" | "supplier"> & {
        admin: Populate<AdminMetaData, "roles">;
        level: Level;
        supplier: Supplier;
      }
    >
  > {
    const filterQuery: FilterQuery<Transaction> = {};

    if (filter.search) {
      filterQuery.$or = [
        { name: { $regex: filter.search, $options: "i" } },
        { description: { $regex: filter.search, $options: "i" } },
      ];
    }

    if (filter.transactionType) filterQuery.transactionType = filter.transactionType;

    if (filter.level) filterQuery.level = filter.level;

    const data = (await this.findManyWithPagination(filterQuery, {
      ...options,
      advancePopulate: {
        path: "level admin supplier",
        populate: {
          path: "roles",
        },
      },
    })) as unknown as ResponseWithPagination<
      Omit<Transaction, "admin" | "level" | "supplier"> & {
        admin: Populate<AdminMetaData, "roles">;
        level: Level;
        supplier: Supplier;
      }
    >;

    return data;
  }
}
