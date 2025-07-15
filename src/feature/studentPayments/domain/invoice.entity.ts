import { BankTransfer } from "../../invoices/domain/bankTransfer.entity";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Admin } from "../../admins/domain/admin.entity";
import { Level } from "../../levels/domains/level.entity";
import { Parent } from "../../parents/domain/parent.entity";
import { SchoolYear } from "../../schoolYears/domain/schoolYear.entity";
import { Student } from "../../students/domain/student.entity";
import { BankCheck } from "./bankCheck.entity";

export const INVOICE_TYPE_ENUM = {
  MONTHLY: "monthly",
  ONE_TIME: "oneTime",
  EXTRA: "extra",
} as const;
export type TInvoiceTypeEnum = (typeof INVOICE_TYPE_ENUM)[keyof typeof INVOICE_TYPE_ENUM];

export const INVOICE_STATUS_ENUM = {
  PAID: "paid",
  UNPAID: "unpaid",
  OVERDUE: "overdue",
  PARTIALLY_PAID: "partiallyPaid",
} as const;
export type TInvoiceStatusEnum = (typeof INVOICE_STATUS_ENUM)[keyof typeof INVOICE_STATUS_ENUM];

export const SPLIT_STATUS_ENUM = {
  PAID: "paid",
  UNPAID: "unpaid",
} as const;
export type TSplitsStatusEnum = (typeof INVOICE_STATUS_ENUM)[keyof typeof INVOICE_STATUS_ENUM];

export const PAYMENT_METHODS_ENUM = {
  CASH: "cash",
  BANK_CHECK: "bankCheck",
  BANK_TRANSFER: "bankTransfer",
} as const;
export type TPaymentMethodsEnum = (typeof PAYMENT_METHODS_ENUM)[keyof typeof PAYMENT_METHODS_ENUM];

export const SPLIT_METHODS_ENUM = {
  CASH: "cash",
  BANK_CHECK: "bankCheck",
  BANK_TRANSFER: "bankTransfer",
} as const;
export type TSplitMethodsEnum = (typeof SPLIT_METHODS_ENUM)[keyof typeof SPLIT_METHODS_ENUM];

type StudentAndSchoolYear = {
  student: ID;
  schoolYear: ID;
};

export type StudentInvoiceService = {
  _id: ID;
  name: string;
  amount: number;
  newId: string;
  discount: number;
  month: number;
};

export type Invoice = {
  students: StudentAndSchoolYear[];
  levels: ID[];
  paymentMethod: TPaymentMethodsEnum | null;
  invoiceType: TInvoiceTypeEnum;
  services: StudentInvoiceService[];
  amount: number;
  adminIdPaidBy: ID | null;
  adminIdUnPaidBy: ID | null;
  dueDate: Date;
  dates: Date[];
  paidAt: Date | null;
  unPaidAt: Date | null;
  discount: number;
  remindedByEmailAt: Date | null;
  remindedByPhoneAt: Date | null;
  email: string | null;
  phoneNumber: string | null;
  status: TInvoiceStatusEnum;
  isMerged: boolean;
  mergedInvoices: ID[];
  mergedInto: ID | null;
  mergedBy: ID | null;
  mergedAt?: Date;
  parent: ID | null;
  createdAt: Date;
  paymentSplits: {
    _id: ID;
    amount: number;
    dueDate: Date;
    paidAt: Date | null;
    unPaidAt: Date | null;
    adminIdUnPaidBy: ID | null;
    paymentMethod: TSplitMethodsEnum;
    bankCheck: ID | null;
    bankTransfer: ID | null;
    parent: ID | null;
    adminIdPaidBy: ID | null;
    status: TSplitsStatusEnum;
  }[];
} & BaseEntity;

export type InvoiceMetaData = GenerateMetaData<
  Invoice,
  {
    mergedBy: Admin;
    parent: Parent;
    mergedInvoices: Invoice[];
    mergedInto: Invoice;
    levels: Level[];
    adminIdUnPaidBy: Admin;
    adminIdPaidBy: Admin;
    "students.student": Student;
    "students.schoolYear": SchoolYear;
    "paymentSplits.parent": Parent;
    "paymentSplits.bankCheck": BankCheck;
    "paymentSplits.bankTransfer": BankTransfer;
    "paymentSplits.adminIdPaidBy": Admin;
    "paymentSplits.adminIdUnPaidBy": Admin;
  }
>;
