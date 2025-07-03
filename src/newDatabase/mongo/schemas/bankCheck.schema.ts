import { Types } from "mongoose";
import { BankCheck } from "../../../feature/studentPayments/bankCheck.entity";
import { createMongoSchema } from "../createSchema";

export const mongoBankCheckSchema = createMongoSchema<BankCheck>({
  fullName: String,
  amount: Number,
  bankName: String,
  checkNumber: String,
  invoice: { type: Types.ObjectId, ref: "invoice" },
  phoneNumber: String,
  status: String,
  withdrawDate: Date,
});
