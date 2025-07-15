import { TTransactionAdjustmentTypeEnum } from "./teacherPaymentConfiguration.entity";
import { ID } from "./../../../types/BaseEntity";
import { BaseRepo } from "../../../core/BaseRepo";
import {
  TeacherPaymentHistory,
  TeacherPaymentHistoryMetaData,
} from "./teacherPaymentHistory.entity";

export abstract class TeacherPaymentHistoryRepo extends BaseRepo<TeacherPaymentHistoryMetaData> {
  abstract findManyByLevel(levelId: string): Promise<TeacherPaymentHistory[]>;
  abstract findOneByTeacherMonthAndYear(
    teacherId: ID,
    month: number,
    year: number,
  ): Promise<TeacherPaymentHistory | null>;
  abstract addTransactionAdjustment(
    query: {
      month: number;
      teacher: ID;
      year: number;
    },
    transactionAdjustment: {
      name: string;
      amount: number;
      type: TTransactionAdjustmentTypeEnum;
      insertedAt: Date;
      paidBy: ID;
    },
  ): Promise<void>;

  abstract updateTeacherPaymentHistory(
    id: ID,
    teacherId: ID,
    dates: {
      month: number;
      year: number;
      currentTimeOfSchool: Date;
      adminId: ID;
      teacherLevel: ID;
      totalSalary: number;
    },
  ): Promise<void>;

  abstract calculateTotalTeachersSalary(
    startDate: Date,
    endDate: Date,
    levels: ID[],
  ): Promise<number>;
}
