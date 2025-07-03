import { InvoiceMetaData } from "./../../../feature/studentPayments/invoice.entity";
import { Populate } from "./../../../core/populateTypes";
import { ID } from "./../../../types/BaseEntity";
import { BankTransfer } from "./../../../feature/payment/domain/bankTransfer.entity";
import { ResponseWithPagination } from "../types";
import { ListOptions } from "./../../../types/types";
import { ClientSession, Connection, FilterQuery } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { BankTransferMetaData } from "../../../feature/payment/domain/bankTransfer.entity";
import { BankTransferRepo } from "../../../feature/payment/domain/BankTransfer.repo";
import { MongoBaseRepo } from "./MongoBase.repo";

export class MongoBankTransferRepo
  extends MongoBaseRepo<BankTransferMetaData>
  implements BankTransferRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "bankTransfer", session);
  }

  async listBankTransfers(
    filter: { search?: string },
    options: ListOptions,
  ): Promise<
    ResponseWithPagination<
      Omit<BankTransfer, "invoice"> & {
        invoice: Populate<InvoiceMetaData, "parent">;
      }
    >
  > {
    const filterQuery: FilterQuery<BankTransfer> = {};

    if (filter.search) {
      filterQuery.$or = [];

      filterQuery.$or.push({ fullName: { $regex: filter.search, $options: "i" } });
      filterQuery.$or.push({ bankName: { $regex: filter.search, $options: "i" } });
      filterQuery.$or.push({ transactionReference: { $regex: filter.search, $options: "i" } });
    }

    const response = (await this.findManyWithPagination(filterQuery, {
      ...options,
      advancePopulate: {
        path: "invoice",
        populate: "parent",
      },
    })) as unknown as ResponseWithPagination<
      Omit<BankTransfer, "invoice"> & {
        invoice: Populate<InvoiceMetaData, "parent">;
      }
    >;

    return response;
  }

  async findTransactionReferenceDuplication(
    bankTransferId: ID,
    transactionReference: string,
  ): Promise<BankTransferMetaData["entity"] | null> {
    const result = await this.model.findOne({ _id: { $ne: bankTransferId }, transactionReference });
    return result;
  }
}
