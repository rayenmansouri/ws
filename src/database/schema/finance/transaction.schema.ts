import { ObjectId, Types } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import { TTransactionTypeEnum } from "../../../feature/transactions/transaction.entity";

export interface ITransaction extends IEntity {
  level: ObjectId;
  transactionType: TTransactionTypeEnum;
  name: string;
  amount: number;
  admin: ObjectId;
  supplier: ObjectId | null;
  paidAt: Date;
  recordedAt: Date;
  description: string | null;
}

export const transactionSchema = createSchema<ITransaction>({
  name: String,
  amount: Number,
  level: { type: Types.ObjectId, ref: "level" },
  admin: { type: Types.ObjectId, ref: "admin" },
  supplier: { type: Types.ObjectId, ref: "supplier" },
  recordedAt: Date,
  transactionType: { type: String },
  paidAt: Date,
  description: String,
});
