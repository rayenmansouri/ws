import { Types } from "mongoose";
import { BankTransfer } from "../../../feature/payment/domain/bankTransfer.entity";
import { createMongoSchema } from "../createSchema";

export const mongoBankTransferSchema = createMongoSchema<BankTransfer>({
  amount: Number,
  fullName: String,
  transactionReference: String,
  transferDate: Date,
  bankName: String,
  invoice: { type: Types.ObjectId, ref: "invoice" },
  isDeleted: Boolean,
});
