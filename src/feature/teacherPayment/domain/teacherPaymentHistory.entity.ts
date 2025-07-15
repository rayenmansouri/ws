import { GenerateMetaData } from "../../../core/populateTypes";
import { TTransactionAdjustmentTypeEnum } from "./teacherPaymentConfiguration.entity";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Admin } from "../../admins/domain/admin.entity";
import { Level } from "../../levels/domains/level.entity";
import { Teacher } from "../../teachers/domain/teacher.entity";

export type transactionAdjustment = {
  _id?: ID;
  name: string;
  amount: number;
  paidBy: ID;
  type: TTransactionAdjustmentTypeEnum;
  insertedAt: Date;
};

export type TeacherPaymentHistory = {
  paidBy: ID | null;
  month: number;
  baseAmount: number | null;
  year: number;
  hasPaid: boolean;
  teacher: ID;
  paidAt: Date | null;
  transactionAdjustment: transactionAdjustment[];
  level: ID | null;
} & BaseEntity;

export type TeacherPaymentHistoryMetaData = GenerateMetaData<
  TeacherPaymentHistory,
  {
    teacher: Teacher;
    level: Level;
    paidBy: Admin;
    "transactionAdjustment.paidBy": Admin;
  }
>;
