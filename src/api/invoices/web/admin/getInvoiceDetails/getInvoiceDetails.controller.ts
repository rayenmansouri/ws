import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetInvoiceDetailsUseCase } from "../../../../../feature/invoices/useCases/GetInvoiceDetails.usecase";
import { GetInvoiceDetailsRouteConfig, GetInvoiceDetailsResponse } from "./getInvoiceDetails.types";

@Controller()
export class GetInvoiceDetailsController extends BaseController<GetInvoiceDetailsRouteConfig> {
  constructor(
    @inject("GetInvoiceDetailsUseCase")
    private getInvoiceDetailsUseCase: GetInvoiceDetailsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetInvoiceDetailsRouteConfig>): Promise<void | APIResponse> {
    const { invoiceNewId } = req.params;
    const invoiceDetails = await this.getInvoiceDetailsUseCase.execute(invoiceNewId);
    return new SuccessResponse<GetInvoiceDetailsResponse>("global.success", invoiceDetails);
  }
}
