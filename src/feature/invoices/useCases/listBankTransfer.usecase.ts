import { InvoiceMetaData } from "../../studentPayments/domain/invoice.entity";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BankTransferRepo } from "../../invoices/domain/BankTransfer.repo";
import { Populate } from "../../../core/populateTypes";
import { ResponseWithPagination } from "../../../newDatabase/mongo/types";
import { BankTransfer } from "../../invoices/domain/bankTransfer.entity";

export type listBankTransfersRequestDto = {
  search?: string;
  page?: number;
  limit?: number;
};

@injectable()
export class listBankTransferUseCase {
  constructor(@inject("BankTransferRepo") private readonly bankTransferRepo: BankTransferRepo) {}

  async execute(dto: listBankTransfersRequestDto): Promise<
    ResponseWithPagination<
      Omit<BankTransfer, "invoice"> & {
        invoice: Populate<InvoiceMetaData, "parent">;
      }
    >
  > {
    const bankTransfers = await this.bankTransferRepo.listBankTransfers(
      { search: dto.search },
      { page: dto.page, limit: dto.limit },
    );
    return bankTransfers;
  }
}
