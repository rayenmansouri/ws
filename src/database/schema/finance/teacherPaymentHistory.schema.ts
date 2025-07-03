import { TTransactionAdjustmentTypeEnum } from "./../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";
import mongoose, { ObjectId, Types } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import { transactionAdjustmentSchema } from "../../../newDatabase/mongo/schemas/teacherPaymentHistory.schema";

export interface transactionAdjustment {
  _id?: ObjectId;
  name: string;
  amount: number;
  paidBy: ObjectId;
  type: TTransactionAdjustmentTypeEnum;
  insertedAt: Date;
}
export interface ITeacherPaymentHistory extends IEntity {
  paidBy: ObjectId | null;
  month: number;
  baseAmount: number | null;
  year: number;
  hasPaid: boolean;
  teacher: ObjectId;
  paidAt: Date | null;
  transactionAdjustment: transactionAdjustment[];
  level: ObjectId | null;
}
export const teacherPaymentHistorySchema = createSchema<ITeacherPaymentHistory>({
  paidBy: { type: Types.ObjectId, ref: "admin" },
  month: Number,
  year: Number,
  baseAmount: { type: Number, default: null },
  hasPaid: { type: Boolean, default: false },
  transactionAdjustment: { type: [transactionAdjustmentSchema] },
  teacher: { type: Types.ObjectId, ref: "teacher", index: true },
  paidAt: { type: Date, default: null },
  level: { type: mongoose.Types.ObjectId, ref: "level", default: null },
});

teacherPaymentHistorySchema.index({ month: 1, year: 1, teacher: 1 }, { unique: true });
