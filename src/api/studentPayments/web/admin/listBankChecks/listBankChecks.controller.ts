import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseExportController } from "../../../../../core/express/controllers/ExportController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { BankCheckRepo } from "../../../../../feature/studentPayments/domain/BankCheck.repo";
import { ListBankChecksResponse, ListBankChecksRouteConfig } from "./listBankChecks.types";

@Controller()
export class ListBankChecksController extends BaseExportController<
  ListBankChecksRouteConfig,
  ListBankChecksResponse
> {
  constructor(@inject("BankCheckRepo") private bankCheckRepo: BankCheckRepo) {
    super();
  }

  async main(req: TypedRequest<ListBankChecksRouteConfig>): Promise<APIResponse> {
    const response = await this.bankCheckRepo.listBankChecks(
      { search: req.query.search },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListBankChecksResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }

  formatDataBeforeExport(data: ListBankChecksResponse): Array<{
    fullName: string;
    bankName: string;
    phoneNumber: string;
    checkNumber: string;
    amount: string;
    status: string;
  }> {
    return data.docs.map(bankCheck => ({
      fullName: bankCheck.fullName,
      bankName: bankCheck.bankName,
      phoneNumber: bankCheck.phoneNumber || "-",
      checkNumber: bankCheck.checkNumber,
      amount: bankCheck.amount.toString(),
      status: bankCheck.status,
    }));
  }
}
