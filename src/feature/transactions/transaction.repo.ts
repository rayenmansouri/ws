import { BaseRepo } from "../../core/BaseRepo";
import { Populate } from "../../core/populateTypes";
import { ResponseWithPagination } from "../../newDatabase/mongo/types";
import { ID } from "../../types/BaseEntity";
import { ListOptions } from "../../types/types";
import { AdminMetaData } from "../admins/domain/admin.entity";
import { Level } from "../levels/domains/level.entity";
import { Supplier } from "../supplier/supplier.entity";
import { Transaction, TransactionMetaData, TTransactionTypeEnum } from "./transaction.entity";

export abstract class TransactionRepo extends BaseRepo<TransactionMetaData> {
  abstract getTransactionsBySuppliers(supplierIds: ID[]): Promise<TransactionMetaData["entity"][]>;
  abstract findManyByLevel(levelId: ID): Promise<TransactionMetaData["entity"][]>;

  abstract listTransactions(
    filter: {
      search?: string;
      transactionType?: TTransactionTypeEnum;
      level?: ID;
    },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Omit<Transaction, "admin" | "level" | "supplier"> & {
        admin: Populate<AdminMetaData, "roles">;
        level: Level;
        supplier: Supplier | null;
      }
    >
  >;

  abstract getLatestTransactionByRange(
    startDate: Date,
    endDate: Date,
    levelIds: ID[],
  ): Promise<Transaction[]>;

  abstract getTransactionTotalAmountByType(
    startDate: Date,
    endDate: Date,
    levelIds: ID[],
  ): Promise<{ totalAmount: number; transactionType: TTransactionTypeEnum }[]>;

  abstract getTransactionsDistribution(
    range: { startDate: Date; endDate: Date },
    levelIds: ID[],
    transactionDetail: {
      transactionType: TTransactionTypeEnum;
      totalAmount: number;
    },
  ): Promise<{ name: string; rate: number | null; amount: number }[]>;
}
