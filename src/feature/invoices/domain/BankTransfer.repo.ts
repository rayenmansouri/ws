import { BaseRepo } from "../../../core/BaseRepo";
import { Populate } from "./../../../core/populateTypes";
import { ResponseWithPagination } from "./../../../newDatabase/mongo/types";
import { ID } from "./../../../types/BaseEntity";
import { ListOptions } from "./../../../types/types";
import { InvoiceMetaData } from "../../studentPayments/domain/invoice.entity";
import { BankTransfer, BankTransferMetaData } from "./bankTransfer.entity";

export abstract class BankTransferRepo extends BaseRepo<BankTransferMetaData> {
  abstract listBankTransfers(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Omit<BankTransfer, "invoice"> & {
        invoice: Populate<InvoiceMetaData, "parent">;
      }
    >
  >;

  abstract findTransactionReferenceDuplication(
    bankTransferId: ID,
    transactionReference: string,
  ): Promise<BankTransferMetaData["entity"] | null>;
}
