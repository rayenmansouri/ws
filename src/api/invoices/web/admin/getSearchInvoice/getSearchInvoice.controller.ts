import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSearchInvoicesUseCase } from "../../../../../feature/invoices/useCases/GetSearchInvoices.usecase";
import { GetSearchInvoiceRouteConfig, GetSearchInvoiceResponse } from "./getSearchInvoice.types";

@Controller()
export class GetSearchInvoiceController extends BaseController<GetSearchInvoiceRouteConfig> {
  constructor(
    @inject("GetSearchInvoicesUseCase")
    private readonly getSearchInvoicesUseCase: GetSearchInvoicesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetSearchInvoiceRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getSearchInvoicesUseCase.execute({
      search: req.params.searchTerm,
    });
    return new SuccessResponse<GetSearchInvoiceResponse>("global.success", response);
  }
}
