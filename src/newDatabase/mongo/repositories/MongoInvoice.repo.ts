import { PaymentServices } from "./../../../feature/invoices/domain/payment.service";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import {
  Invoice,
  INVOICE_TYPE_ENUM,
  InvoiceMetaData,
} from "../../../feature/studentPayments/domain/invoice.entity";
import { InvoiceRepo } from "../../../feature/studentPayments/domain/Invoice.repo";
import { stringsToObjectIds } from "../../../helpers/stringToObjectId";
import {
  TPaymentMethodsEnum,
  SPLIT_STATUS_ENUM,
  INVOICE_STATUS_ENUM,
} from "./../../../database/schema/finance/Invoice.schema";
import {
  TInvoiceStatusEnum,
  TInvoiceTypeEnum,
} from "../../../feature/studentPayments/domain/invoice.entity";
import { ListStudentsInvoicesResponse } from "../../../feature/studentPayments/domain/Invoice.repo";
import { ID } from "./../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";
import { Populate } from "../../../core/populateTypes";

export class MongoInvoiceRepo extends MongoBaseRepo<InvoiceMetaData> implements InvoiceRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "invoice", session);
  }

  async findStudentMonthlyInvoices(studentId: ID, schoolYearId: ID): Promise<Invoice[]> {
    const filterQuery = {
      students: { $elemMatch: { student: studentId, schoolYear: schoolYearId } },
      isMerged: false,
      invoiceType: INVOICE_TYPE_ENUM.MONTHLY,
    };

    return this.model.find(filterQuery).lean();
  }

  async findManyByStudents(
    studentIds: ID[],
    schoolYearIds: ID[] | null,
  ): Promise<Populate<InvoiceMetaData, "students.schoolYear" | "students.student">[]> {
    const filterQuery: {
      students: { $elemMatch: { student: { $in: ID[] }; schoolYear?: { $in: ID[] } } };
      mergedInto: null;
    } = {
      students: { $elemMatch: { student: { $in: studentIds } } },
      mergedInto: null,
    };
    if (schoolYearIds) filterQuery.students.$elemMatch.schoolYear = { $in: schoolYearIds };

    return this.model
      .find(filterQuery)
      .populate("students.student students.schoolYear")
      .sort("-newId")
      .lean();
  }

  async calculateServicesTotalAmount(
    startDate: Date,
    endDate: Date,
    levels: ID[],
  ): Promise<{ name: string; amount: number }[]> {
    const result = await this.model.aggregate<{ _id: string; amount: number }>([
      {
        $match: {
          levels: { $in: stringsToObjectIds(levels) },
          paidAt: { $gte: startDate, $lte: endDate },
          isMerged: { $ne: true },
        },
      },
      { $unwind: "$services" },
      {
        $addFields: {
          newAmount: {
            $multiply: [
              "$services.amount",
              { $subtract: [1, { $divide: ["$services.discount", 100] }] },
            ],
          },
        },
      },
      { $group: { _id: "$services.name", amount: { $sum: "$newAmount" } } },
      { $sort: { amount: -1 } },
    ]);

    return result.map(doc => ({ name: doc._id, amount: doc.amount }));
  }

  async getTotalInvoicesAmount(startDate: Date, endDate: Date, levelIds: ID[]): Promise<number> {
    const result = await this.model.aggregate<{ _id: null; amount: number }>([
      {
        $match: {
          levels: { $in: stringsToObjectIds(levelIds) },
          paidAt: { $gte: startDate, $lte: endDate },
          isMerged: { $ne: true },
        },
      },
      { $group: { _id: null, amount: { $sum: "$amount" } } },
    ]);

    return result.at(0)?.amount ?? 0;
  }

  async findManyByServices(serviceIds: ID[]): Promise<Invoice[]> {
    const filterQuery = {
      "services._id": { $in: stringsToObjectIds(serviceIds) },
    };

    return this.model.find(filterQuery).lean();
  }
  async findUnpaidInvoicesByServiceIds(serviceIds: ID[]): Promise<Invoice[]> {
    const filterQuery = {
      "services._id": { $in: stringsToObjectIds(serviceIds) },
      status: INVOICE_STATUS_ENUM.UNPAID,
    };

    return this.model.find(filterQuery).lean();
  }

  async findManyByLevel(levelId: string): Promise<Invoice[]> {
    return this.model.find({ levels: levelId });
  }

  async listStudentsInvoices(
    studentIds: ID[],
    months: number[] | null,
    paymentMethod: TPaymentMethodsEnum | null,
    invoiceType: TInvoiceTypeEnum | null,
    status: TInvoiceStatusEnum | null,
    searchType: "student" | "parent" | "class" | null,
  ): Promise<ListStudentsInvoicesResponse[]> {
    const queryStudentInvoices = searchType
      ? {
          $elemMatch: {
            student: { $in: stringsToObjectIds(studentIds) },
          },
        }
      : { $exists: true };

    const convertedMonths = months?.map(month => +month + 1);

    const paymentMethodQuery = paymentMethod ? { paymentMethod } : {};

    const monthsQuery = months
      ? {
          $expr: {
            $gt: [
              {
                $size: {
                  $filter: {
                    input: "$dates",
                    as: "date",
                    cond: {
                      $and: [{ $in: [{ $month: "$$date" }, convertedMonths] }],
                    },
                  },
                },
              },
              0,
            ],
          },
        }
      : {};

    const invoices = await this.model.aggregate<ListStudentsInvoicesResponse>([
      {
        $match: {
          mergedInto: null,
          students: queryStudentInvoices,
          status: status || { $exists: true },
          invoiceType: invoiceType || { $exists: true },
          ...paymentMethodQuery,
          ...monthsQuery,
        },
      },
      { $unwind: { path: "$students", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "students",
          localField: "students.student",
          foreignField: "_id",
          as: "studentInfo",
        },
      },
      { $unwind: { path: "$studentInfo", preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "parents",
          localField: "studentInfo.parents",
          foreignField: "_id",
          as: "studentInfo.parents",
        },
      },
      {
        $group: {
          _id: "$_id",
          invoiceData: { $first: "$$ROOT" },
          students: { $push: { student: "$studentInfo" } },
        },
      },
      {
        $replaceRoot: { newRoot: { $mergeObjects: ["$invoiceData", { students: "$students" }] } },
      },
    ]);

    return invoices;
  }

  async paySplit(payload: {
    invoiceId: ID;
    splitIndex: number;
    parentId: ID;
    adminId: ID;
    tenantId: string;
    paymentMethod: TPaymentMethodsEnum;
    bankCheckId?: ID;
  }): Promise<Invoice> {
    const updatedInvoice = await this.updateOneById(payload.invoiceId, {
      [`paymentSplits.${payload.splitIndex - 1}.status`]: SPLIT_STATUS_ENUM.PAID,
      [`paymentSplits.${payload.splitIndex - 1}.parent`]: payload.parentId,
      [`paymentSplits.${payload.splitIndex - 1}.adminIdPaidBy`]: payload.adminId,
      [`paymentSplits.${payload.splitIndex - 1}.paidAt`]: getCurrentTimeOfSchool(payload.tenantId),
      [`paymentSplits.${payload.splitIndex - 1}.bankCheck`]: payload.bankCheckId || null,
      [`paymentSplits.${payload.splitIndex - 1}.paymentMethod`]: payload.paymentMethod,

      paymentMethod: payload.paymentMethod,
      parent: payload.parentId,
      adminIdPaidBy: payload.adminId,
      status: INVOICE_STATUS_ENUM.PARTIALLY_PAID,
    });

    // i know this check make no sense but updateInvoice use findOneAndUpdate which may return null
    if (updatedInvoice) {
      if (PaymentServices.isAllSplitsPaid(updatedInvoice)) {
        const updateFields = {
          paidAt: getCurrentTimeOfSchool(payload.tenantId),
          adminIdPaidBy: payload.adminId,
          parent: payload.parentId,
          status: INVOICE_STATUS_ENUM.PAID,
        };

        if (updatedInvoice.isMerged) {
          await this.updateManyByIds(
            [payload.invoiceId, ...updatedInvoice.mergedInvoices],
            updateFields,
          );
        } else {
          await this.updateOneById(payload.invoiceId, updateFields);
        }
      }
    }
    return updatedInvoice!;
  }

  async payInvoice(payload: {
    invoiceId: ID;
    paymentMethod: TPaymentMethodsEnum;
    parentId: ID;
    adminId: ID;
    isMerged: boolean;
    paidAt: Date;
    mergedInvoicesIds: ID[];
  }): Promise<Invoice> {
    const updatePayload = {
      status: INVOICE_STATUS_ENUM.PAID,
      paymentMethod: payload.paymentMethod,
      paidAt: payload.paidAt,
      parent: payload.parentId,
      adminIdPaidBy: payload.adminId,
    };

    if (payload.isMerged) {
      await this.updateManyByIds(payload.mergedInvoicesIds, updatePayload);
    }
    return (await this.updateOneById(payload.invoiceId, updatePayload))!;
  }
}
