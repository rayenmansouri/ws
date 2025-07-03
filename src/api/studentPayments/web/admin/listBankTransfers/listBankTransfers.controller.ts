import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { BankTransferRepo } from "../../../../../feature/payment/domain/BankTransfer.repo";
import { ListBankTransfersResponse, ListBankTransfersRouteConfig } from "./listBankTransfers.types";

@Controller()
export class ListBankTransfersController extends BaseExportController<
  ListBankTransfersRouteConfig,
  ListBankTransfersResponse
> {
  constructor(@inject("BankTransferRepo") private readonly bankTransferRepo: BankTransferRepo) {
    super();
  }

  async main(req: TypedRequest<ListBankTransfersRouteConfig>): Promise<APIResponse> {
    const bankTransfers = await this.bankTransferRepo.listBankTransfers(
      { search: req.query.search },
      { page: req.query.page, limit: req.query.limit },
    );

    const mappedBankTransfers = bankTransfers.docs.map(bankTransfer => {
      return {
        ...bankTransfer,
        phoneNumber: bankTransfer.invoice.parent.phoneNumber,
        invoice: undefined,
      };
    });

    return new SuccessResponse<ListBankTransfersResponse>("global.success", {
      docs: mappedBankTransfers,
      meta: bankTransfers.meta,
    });
  }

  formatDataBeforeExport(data: ListBankTransfersResponse): Array<{
    fullName: string;
    bankName: string;
    transactionReference: string;
    amount: string;
  }> {
    return data.docs.map(bankTransfer => ({
      fullName: bankTransfer.fullName,
      bankName: bankTransfer.bankName || "-",
      transactionReference: bankTransfer.transactionReference || "-",
      amount: bankTransfer.amount.toString(),
    }));
  }
}
