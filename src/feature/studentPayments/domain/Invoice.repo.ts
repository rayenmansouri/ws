import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "../../../core/populateTypes";
import { TPaymentMethodsEnum } from "../../../database/schema/finance/Invoice.schema";
import { ID } from "../../../types/BaseEntity";
import { StudentMetaData } from "../../students/domain/student.entity";
import { Invoice, InvoiceMetaData, TInvoiceStatusEnum, TInvoiceTypeEnum } from "./invoice.entity";

export type ListStudentsInvoicesResponse = Omit<Invoice, "students"> & {
  students: { student: Populate<StudentMetaData, "parents"> }[];
};
export abstract class InvoiceRepo extends BaseRepo<InvoiceMetaData> {
  abstract findManyByLevel(levelId: string): Promise<Invoice[]>;
  abstract findManyByServices(serviceIds: ID[]): Promise<Invoice[]>;
  abstract findUnpaidInvoicesByServiceIds(serviceIds: ID[]): Promise<Invoice[]>;
  abstract findManyByStudents(
    studentIds: ID[],
    schoolYearIds: ID[] | null,
  ): Promise<Populate<InvoiceMetaData, "students.schoolYear" | "students.student">[]>;
  abstract findStudentMonthlyInvoices(studentId: ID, schoolYearId: ID): Promise<Invoice[]>;

  abstract listStudentsInvoices(
    studentIds: ID[],
    month: number[] | null,
    paymentMethod: TPaymentMethodsEnum | null,
    invoiceType: TInvoiceTypeEnum | null,
    status: TInvoiceStatusEnum | null,
    searchType: "student" | "parent" | "class" | null,
  ): Promise<ListStudentsInvoicesResponse[]>;

  abstract paySplit(payload: {
    invoiceId: ID;
    splitIndex: number;
    parentId: ID;
    adminId: ID;
    tenantId: string;
    paymentMethod: TPaymentMethodsEnum;
    bankCheckId?: ID;
  }): Promise<Invoice>;

  abstract payInvoice(payload: {
    invoiceId: ID;
    paymentMethod: TPaymentMethodsEnum;
    parentId: ID;
    adminId: ID;
    isMerged: boolean;
    paidAt: Date;
    mergedInvoicesIds: ID[];
  }): Promise<Invoice>;

  abstract getTotalInvoicesAmount(startDate: Date, endDate: Date, levelIds: ID[]): Promise<number>;

  abstract calculateServicesTotalAmount(
    startDate: Date,
    endDate: Date,
    levels: ID[],
  ): Promise<{ name: string; amount: number }[]>;
}
