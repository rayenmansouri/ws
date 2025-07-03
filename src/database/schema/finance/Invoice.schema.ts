import { ID } from "./../../../types/BaseEntity";
import { PickFromEnum } from "./../../../types/utils/enums.util";
import mongoose, { ObjectId, Schema } from "mongoose";
import { createSchema } from "../../../helpers/createSchema";
import { IEntity } from "../../../types/entities";
import { getEmbeddedSchema } from "../../helpers/getEmbeddedSchema";
import { StudentInvoiceService, serviceSchema } from "./service.schema";

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

export type IServiceWithDiscount = StudentInvoiceService & { discount: number };

export const SPLIT_METHODS_ENUM = {
  CASH: "cash",
  BANK_CHECK: "bankCheck",
  BANK_TRANSFER: "bankTransfer",
} as const;
export type TSplitMethodsEnum = (typeof SPLIT_METHODS_ENUM)[keyof typeof SPLIT_METHODS_ENUM];

type TBasePaymentSplit = {
  amount: number;
  dueDate: Date;
  unPaidAt: Date | null;
  adminIdUnPaidBy: ObjectId | null;
};

type TUnpaidCashPaymentSplit = TBasePaymentSplit & {
  paymentMethod: PickFromEnum<TSplitMethodsEnum, "cash">;
  bankCheck: null;
  status: PickFromEnum<TSplitsStatusEnum, "unpaid">;
  parent: null;
  adminIdPaidBy: null;
};

type TUnpaidBankCheckPaymentSplit = TBasePaymentSplit & {
  paymentMethod: PickFromEnum<TSplitMethodsEnum, "bankCheck">;
  bankCheck: null;
  status: PickFromEnum<TSplitsStatusEnum, "unpaid">;
  parent: null;
  adminIdPaidBy: null;
};

type TUnpaidBankTransferPaymentSplit = TBasePaymentSplit & {
  paymentMethod: PickFromEnum<TSplitMethodsEnum, "bankTransfer">;
  bankCheck: null;
  bankTransfer: ID;
  status: PickFromEnum<TSplitsStatusEnum, "unpaid">;
  parent: null;
  adminIdPaidBy: null;
};

type TPaidCashPaymentSplit = TBasePaymentSplit & {
  paymentMethod: PickFromEnum<TSplitMethodsEnum, "cash">;
  bankCheck: null;
  status: PickFromEnum<TSplitsStatusEnum, "paid">;
  parent: ObjectId;
  paidAt: Date;
  adminIdPaidBy: ObjectId;
};

type TPaidBankTransferPaymentSplit = TBasePaymentSplit & {
  paymentMethod: PickFromEnum<TSplitMethodsEnum, "bankTransfer">;
  bankCheck: null;
  bankTransfer: ID;
  status: PickFromEnum<TSplitsStatusEnum, "paid">;
  parent: ObjectId;
  paidAt: Date;
  adminIdPaidBy: ObjectId;
};

type TPaidBankCheckPaymentSplit = TBasePaymentSplit & {
  paymentMethod: PickFromEnum<TSplitMethodsEnum, "bankCheck">;
  bankCheck: ObjectId;
  status: PickFromEnum<TSplitsStatusEnum, "paid">;
  parent: ObjectId;
  paidAt: Date;
  adminIdPaidBy: ObjectId;
};

export type IPaymentSplit =
  | TUnpaidCashPaymentSplit
  | TUnpaidBankCheckPaymentSplit
  | TUnpaidBankTransferPaymentSplit
  | TPaidCashPaymentSplit
  | TPaidBankCheckPaymentSplit
  | TPaidBankTransferPaymentSplit;

export type InvoiceType = PickFromEnum<TInvoiceTypeEnum, "monthly" | "oneTime">;

export interface IStudentAndSchoolYear {
  student: ObjectId;
  schoolYear: ObjectId;
}
export interface IInvoice extends IEntity {
  students: IStudentAndSchoolYear[];
  levels: ObjectId[];
  paymentMethod: TPaymentMethodsEnum;
  invoiceType: TInvoiceTypeEnum;
  services: (IServiceWithDiscount & { month: number })[];
  amount: number;
  adminIdPaidBy: ObjectId;
  adminIdUnPaidBy: ObjectId;
  dueDate: Date;
  dates: Date[];
  paidAt: Date;
  unPaidAt: Date;
  discount: number;
  remindedByEmailAt: Date | null;
  remindedByPhoneAt: Date | null;
  email: string | null;
  phoneNumber: string | null;
  note: string;
  status: TInvoiceStatusEnum;
  isMerged: boolean;
  mergedInvoices: ObjectId[];
  mergedInto: ObjectId | null;
  mergedBy?: ObjectId;
  mergedAt?: Date;
  parent: ObjectId;
  createdAt: Date;
  paymentSplits: IPaymentSplit[];
}

const serviceSchemaInsideInvoice = new Schema(
  {
    ...getEmbeddedSchema(serviceSchema),
    discount: Number,
    month: Number,
  },
  { _id: false },
);
const paymentSplitSchema = new Schema<IPaymentSplit>(
  {
    amount: Number,
    paidAt: Date,
    unPaidAt: Date,
    dueDate: Date,
    status: { type: String, enum: SPLIT_STATUS_ENUM },
    paymentMethod: { type: String, enum: PAYMENT_METHODS_ENUM },
    parent: { type: mongoose.Types.ObjectId, ref: "parent", default: null },
    adminIdPaidBy: { type: mongoose.Types.ObjectId, ref: "admin", default: null },
    adminIdUnPaidBy: { type: mongoose.Types.ObjectId, ref: "admin", default: null },
    bankCheck: { type: mongoose.Types.ObjectId, ref: "bankCheck", default: null },
  },
  { _id: false },
);
const studentAndSchoolYearSchema = new Schema<IStudentAndSchoolYear>(
  {
    student: { type: mongoose.Types.ObjectId, ref: "student" },
    schoolYear: { type: mongoose.Types.ObjectId, ref: "schoolYear" },
  },
  {
    _id: false,
  },
);

export const invoiceSchema = createSchema<IInvoice>({
  students: [studentAndSchoolYearSchema],
  levels: [{ type: mongoose.Types.ObjectId, ref: "level" }],
  paymentMethod: { type: String, enum: PAYMENT_METHODS_ENUM },
  invoiceType: String,
  services: { type: [serviceSchemaInsideInvoice], default: [] },
  amount: Number,
  discount: Number,
  adminIdPaidBy: { type: mongoose.Types.ObjectId, ref: "admin" },
  adminIdUnPaidBy: { type: mongoose.Types.ObjectId, ref: "admin" },
  dueDate: Date,
  paidAt: Date,
  unPaidAt: Date,
  remindedByEmailAt: { type: Date, default: null },
  remindedByPhoneAt: { type: Date, default: null },
  email: { type: String, default: null },
  phoneNumber: { type: String, default: null },
  note: String,
  status: {
    type: String,
    enum: ["paid", "unpaid", "overdue"],
  },
  isMerged: {
    type: Boolean,
    default: false,
  },
  mergedInvoices: {
    type: [mongoose.Types.ObjectId],
    ref: "invoice",
    default: undefined,
  },
  mergedInto: {
    type: mongoose.Types.ObjectId,
    ref: "invoice",
    default: null,
  },
  mergedAt: Date,
  dates: [Date],
  mergedBy: {
    type: mongoose.Types.ObjectId,
    ref: "admin",
    default: undefined,
  },
  parent: {
    type: mongoose.Types.ObjectId,
    ref: "parent",
  },
  paymentSplits: [{ type: paymentSplitSchema, default: [] }],
});
