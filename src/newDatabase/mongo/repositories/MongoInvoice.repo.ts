import { PaymentServices } from "./../../../feature/payment/domain/payment.service";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Invoice, InvoiceMetaData } from "../../../feature/studentPayments/invoice.entity";
import { InvoiceRepo } from "../../../feature/studentPayments/Invoice.repo";
import { stringsToObjectIds } from "../../../helpers/stringToObjectId";
import {
  TPaymentMethodsEnum,
  SPLIT_STATUS_ENUM,
  INVOICE_STATUS_ENUM,
} from "./../../../database/schema/finance/Invoice.schema";
import {
  TInvoiceStatusEnum,
  TInvoiceTypeEnum,
} from "./../../../feature/studentPayments/invoice.entity";
import { ListStudentsInvoicesResponse } from "./../../../feature/studentPayments/Invoice.repo";
import { ID } from "./../../../types/BaseEntity";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoInvoiceRepo extends MongoBaseRepo<InvoiceMetaData> implements InvoiceRepo {
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "invoice", session);
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
