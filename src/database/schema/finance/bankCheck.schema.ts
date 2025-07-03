import mongoose, { ObjectId } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";

export interface IBankCheck extends IEntity {
  fullName: string;
  checkNumber: string;
  phoneNumber: string;
  bankName: string;
  amount: number;
  withdrawDate: Date;
  status: string;
  invoice: ObjectId;
}

export const bankCheckSchema = createSchema<IBankCheck>({
  fullName: { type: String },
  checkNumber: { type: String, required: true, unique: true },
  phoneNumber: { type: String, required: true },
  bankName: { type: String, required: true },
  amount: { type: Number, required: true },
  withdrawDate: Date,
  status: { type: String, default: "not used" },
  invoice: { type: mongoose.Types.ObjectId, ref: "invoice" },
});
