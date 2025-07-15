import { Invoice } from "../../studentPayments/domain/invoice.entity";
import { ID } from "./../../../types/BaseEntity";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../types/BaseEntity";

export type BankTransfer = {
  fullName: string;
  amount: number;
  bankName: string | null;
  transferDate: Date;
  transactionReference: string | null;
  invoice: ID;
  isDeleted: boolean;
} & BaseEntity;

export type BankTransferMetaData = GenerateMetaData<
  BankTransfer,
  {
    invoice: Invoice;
  }
>;
