import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Invoice } from "../domain/invoice.entity";

export const BANK_CHECK_STATUS_ENUM = {
  NOT_USED: "not used",
  USED: "used",
  REJECTED: "rejected",
  RETURNED: "returned",
} as const;
export type TBankCheckStatus = (typeof BANK_CHECK_STATUS_ENUM)[keyof typeof BANK_CHECK_STATUS_ENUM];

export type BankCheck = {
  fullName: string;
  checkNumber: string;
  phoneNumber: string | null;
  bankName: string;
  amount: number;
  withdrawDate: Date | null;
  status: TBankCheckStatus;
  invoice: ID;
} & BaseEntity;

export type BankCheckMetaData = GenerateMetaData<
  BankCheck,
  {
    invoice: Invoice;
  }
>;
