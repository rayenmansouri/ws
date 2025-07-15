import { ID } from "../../../types/BaseEntity";
import { StudentServiceDto } from "../../finance/dtos/SchoolService.dto";
import { SchoolDTO } from "../../schools/dtos/School.dto";
import {
  TInvoiceStatusEnum,
  TInvoiceTypeEnum,
  TPaymentMethodsEnum,
  TSplitsStatusEnum,
} from "../../studentPayments/domain/invoice.entity";
import { UserProfileDTO } from "../../users/dtos/userProfile.dto";

export type InvoiceDto = {
  _id: ID;
  students: UserProfileDTO[];
  parents: UserProfileDTO[];
  newId: string;
  invoiceType: TInvoiceTypeEnum;
  status: TInvoiceStatusEnum;
  splits: PaymentSplitDto[];
  services: { name: string; amount: number; month: number }[];
  servicesCount: number;
  dates: Date[];
  isMerged: boolean;
  isPartiallyPaid: boolean;
  amount: number;
  dueDate: Date;
  paidAt: Date | null;
};

export type InvoiceSearchDto = {
  _id: ID;
  newId: string;
  avatar: string | null;
  name: string;
  type: "student" | "parent" | "class";
};

export type InvoiceExportDto = {
  _id: ID;
  newId: string;
  students: string;
  parents: string;
  dates: string;
  paidAt: string;
  amount: string;
  status: TInvoiceStatusEnum;
  invoiceType: TInvoiceTypeEnum;
};

type PaymentSplitDto = {
  id: string;
  index: number;
  amount: number;
  dueDate: Date;
  paymentMethod: TPaymentMethodsEnum;
  status: TSplitsStatusEnum;
  paidAt: Date | null;
};

export type StudentInvoiceDto = {
  mainInvoices: InvoiceDto[];
  oneTimeInvoices: InvoiceDto[];
};

type UnMergePreview = {
  student: UserProfileDTO;
  invoice: { newId: string; month: number };
  amount: number;
};
export type InvoiceDetailsDto = {
  status: TInvoiceStatusEnum;
  isMerged: boolean;
  statuses: {
    isPaid: boolean;
    isOverdue: boolean;
    isMerged: boolean;
    isPartiallyPaid: boolean;
  };
  unMergePreview: UnMergePreview[];
  invoiceInformation: {
    newId: string;
    dueDate: Date;
    creationDate: Date;
    paidAt: Date | null;
    paymentMethod: TPaymentMethodsEnum | null;
    invoiceType: TInvoiceTypeEnum;
    parents: UserProfileDTO[];
  };
  services: {
    _id: ID;
    uuid: string;
    name: string;
    amountBeforeDiscount: number;
    discount: number;
    amountAfterDiscount: number;
    newId: string;
    date: Date;
  }[];
  children: UserProfileDTO[];
  reminders: { email: string | null; sms: string | null };
  amount: { TVAFees: number; amount: number; discount: number; taxRate: number };
  splits: PaymentSplitDto[];
};

export type InvoicePdfDataDto = {
  invoice: {
    newId: string;
    paidAt: Date | null;
    dueDate: Date;
    paymentMethod: TPaymentMethodsEnum;
    dates: Date[];
    isMerged: boolean;
    invoiceType: TInvoiceTypeEnum;
    status: TInvoiceStatusEnum;
    lastSplitPaid: { index: number; amount: number } | null;
  };
  total: {
    amountBeforeDiscount: number;
    amountAfterDiscount: number;
    discount: string;
    taxRate: number;
    dueAmount: number | null;
  };
  parent: UserProfileDTO & { address: string | null };
  students: { name: string; className: string | null }[];
  services: { month: number; services: StudentServiceDto[] }[];
  schoolInformation: SchoolDTO & { currency: string };
  splits: PaymentSplitDto[];
};
