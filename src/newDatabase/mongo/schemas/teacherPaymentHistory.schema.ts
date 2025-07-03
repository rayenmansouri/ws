import { Types } from "mongoose";
import { TeacherPaymentHistory } from "../../../feature/teacherPayment/domain/teacherPaymentHistory.entity";
import { createMongoSchema } from "../createSchema";
import { Schema } from "mongoose";

export const transactionAdjustmentSchema = new Schema({
  name: String,
  amount: Number,
  paidBy: { type: Types.ObjectId, ref: "admin" },
  type: String,
  insertedAt: Date,
});

export const mongoTeacherPaymentHistorySchema = createMongoSchema<TeacherPaymentHistory>({
  paidBy: { type: Types.ObjectId, ref: "admin" },
  month: { type: Number },
  year: { type: Number },
  baseAmount: { type: Number },
  hasPaid: { type: Boolean },
  //@ts-ignore
  transactionAdjustment: { type: [transactionAdjustmentSchema] },
  teacher: { type: Types.ObjectId, ref: "teacher", index: true },
  paidAt: { type: Date },
  level: { type: Types.ObjectId, ref: "level" },
});
