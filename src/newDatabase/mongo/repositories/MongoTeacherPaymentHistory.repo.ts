import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  TeacherPaymentHistory,
  TeacherPaymentHistoryMetaData,
} from "../../../feature/teacherPayment/domain/teacherPaymentHistory.entity";
import { TeacherPaymentHistoryRepo } from "../../../feature/teacherPayment/domain/TeacherPaymentHistory.repo";
import { ID } from "./../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { stringsToObjectIds } from "../../../helpers/stringToObjectId";
import { TRANSACTION_ADJUSTMENT_TYPE_ENUM } from "../../../feature/teacherPayment/domain/teacherPaymentConfiguration.entity";

export class MongoTeacherPaymentHistoryRepo
  extends MongoBaseRepo<TeacherPaymentHistoryMetaData>
  implements TeacherPaymentHistoryRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "teacherPaymentHistory", session);
  }
  async calculateTotalTeachersSalary(
    startDate: Date,
    endDate: Date,
    levels: ID[],
  ): Promise<number> {
    const result = await this.model.aggregate<{ _id: null; amount: number }>([
      {
        $match: {
          hasPaid: true,
          paidAt: {
            $gte: startDate,
            $lte: endDate,
          },
          level: { $in: stringsToObjectIds(levels) },
        },
      },
      { $project: { baseAmount: 1, transactionAdjustment: 1 } },
      {
        $addFields: {
          totalAdjustmentAmount: {
            $sum: {
              $map: {
                input: "$transactionAdjustment",
                as: "transaction",
                in: {
                  $cond: [
                    { $eq: ["$$transaction.type", TRANSACTION_ADJUSTMENT_TYPE_ENUM.BONUS] },
                    "$$transaction.amount",
                    { $multiply: ["$$transaction.amount", -1] },
                  ],
                },
              },
            },
          },
        },
      },
      { $addFields: { totalSalary: { $add: ["$baseAmount", "$totalAdjustmentAmount"] } } },
      { $group: { _id: null, amount: { $sum: "$totalSalary" } } },
    ]);

    return result.at(0)?.amount ?? 0;
  }
  async findManyByLevel(levelId: string): Promise<TeacherPaymentHistory[]> {
    return this.model.find({ level: levelId }).exec();
  }

  async findOneByTeacherMonthAndYear(
    teacher: ID,
    month: number,
    year: number,
  ): Promise<TeacherPaymentHistory | null> {
    return this.model.findOne({ month, year, teacher });
  }
  async addTransactionAdjustment(
    query: {
      month: number;
      teacher: ID;
      year: number;
    },
    transactionAdjustment: {
      name: string;
      amount: number;
      type: "penalty" | "bonus";
      insertedAt: Date;
      paidBy: ID;
    },
  ): Promise<void> {
    await this.model.updateOne(
      {
        month: query.month,
        teacher: query.teacher,
        year: query.year,
      },
      {
        $push: {
          transactionAdjustment: {
            $each: [transactionAdjustment],
            $position: 0,
          },
        },
      },
    );
  }

  async updateTeacherPaymentHistory(
    id: ID,
    teacherId: ID,
    updates: {
      month: number;
      year: number;
      currentTimeOfSchool: Date;
      adminId: ID;
      teacherLevel: ID;
      totalSalary: number;
    },
  ): Promise<void> {
    await this.model.updateOne(
      {
        _id: id,
        teacher: teacherId,
        month: updates.month,
        year: updates.year,
      },
      {
        hasPaid: true,
        paidBy: updates.adminId,
        paidAt: updates.currentTimeOfSchool,
        level: updates.teacherLevel,
        baseAmount: updates.totalSalary,
      },
      { session: this.session },
    );
  }
}
