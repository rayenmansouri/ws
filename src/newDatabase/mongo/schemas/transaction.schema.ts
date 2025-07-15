import { Types } from "mongoose";
import { Transaction } from "../../../feature/transactions/transaction.entity";
import { createMongoSchema } from "../createSchema";

export const mongoTransactionSchema = createMongoSchema<Transaction>({
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
