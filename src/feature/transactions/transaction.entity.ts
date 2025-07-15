import { GenerateMetaData } from "../../core/populateTypes";
import { BaseEntity, ID } from "../../types/BaseEntity";
import { Admin } from "../admins/domain/admin.entity";
import { Level } from "../levels/domains/level.entity";
import { Supplier } from "../supplier/supplier.entity";

export const TRANSACTION_TYPE_ENUM = {
  EXPENSE: "expense",
  SERVICE: "service",
} as const;
export type TTransactionTypeEnum =
  (typeof TRANSACTION_TYPE_ENUM)[keyof typeof TRANSACTION_TYPE_ENUM];

export type Transaction = {
  level: ID;
  transactionType: TTransactionTypeEnum;
  name: string;
  amount: number;
  admin: ID;
  supplier: ID | null;
  paidAt: Date;
  recordedAt: Date;
  description: string | null;
} & BaseEntity;

export type TransactionMetaData = GenerateMetaData<
  Transaction,
  { level: Level; admin: Admin; supplier: Supplier }
>;
