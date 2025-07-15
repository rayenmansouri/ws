import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  Transaction,
  TransactionMetaData,
  TTransactionTypeEnum,
} from "../../../feature/transactions/transaction.entity";
import { TransactionRepo } from "../../../feature/transactions/transaction.repo";
import { MongoBaseRepo } from "./MongoBase.repo";
import { ID } from "../../../types/BaseEntity";
import { Populate } from "../../../core/populateTypes";
import { AdminMetaData } from "../../../feature/admins/domain/admin.entity";
import { Level } from "../../../feature/levels/domains/level.entity";
import { Supplier } from "../../../feature/supplier/supplier.entity";
import { ListOptions } from "../../../types/types";
import { ResponseWithPagination } from "../types";
import { stringsToObjectIds } from "../../../helpers/stringToObjectId";

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

  async getLatestTransactionByRange(
    startDate: Date,
    endDate: Date,
    levelIds: ID[],
  ): Promise<Transaction[]> {
    return await this.model
      .find({ paidAt: { $gte: startDate, $lt: endDate }, level: { $in: levelIds } })
      .sort({ paidAt: -1 })
      .limit(5)
      .lean();
  }

  async getTransactionTotalAmountByType(
    startDate: Date,
    endDate: Date,
    levelIds: ID[],
  ): Promise<{ totalAmount: number; transactionType: TTransactionTypeEnum }[]> {
    return await this.model.aggregate([
      {
        $match: {
          level: { $in: stringsToObjectIds(levelIds) },
          paidAt: { $gte: startDate, $lte: endDate },
        },
      },
      { $group: { _id: "$transactionType", totalAmount: { $sum: "$amount" } } },
      { $project: { _id: 0, transactionType: "$_id", totalAmount: 1 } },
    ]);
  }

  async getTransactionsDistribution(
    range: { startDate: Date; endDate: Date },
    levelIds: ID[],
    transactionDetail: {
      transactionType: TTransactionTypeEnum;
      totalAmount: number;
    },
  ): Promise<{ name: string; rate: number | null; amount: number }[]> {
    const { startDate, endDate } = range;
    const { transactionType, totalAmount } = transactionDetail;
    const result = await this.model.aggregate<{
      _id: { name: string };
      rate: number;
      amount: number;
    }>([
      {
        $match: {
          transactionType: transactionType,
          level: { $in: stringsToObjectIds(levelIds) },
          paidAt: { $gte: startDate, $lte: endDate },
        },
      },
      { $group: { _id: { name: "$name" }, amount: { $sum: "$amount" } } },
      {
        $project: {
          "transaction.amount": 1,
          rate: { $divide: ["$amount", totalAmount] },
          amount: { $divide: ["$amount", 1] },
        },
      },
      {
        $sort: { amount: -1 },
      },
    ]);
    return result.map(item => ({
      name: item._id.name,
      rate: item.rate,
      amount: item.amount,
    }));
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
