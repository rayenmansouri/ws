import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetInvoicePdfDataUseCase } from "../../../../../feature/invoices/useCases/GetInvoicePdfData.usecase";
import { GetInvoicePdfDataRouteConfig, GetInvoicePdfDataResponse } from "./getInvoicePdfData.types";

@Controller()
export class GetInvoicePdfDataController extends BaseController<GetInvoicePdfDataRouteConfig> {
  constructor(
    @inject("GetInvoicePdfDataUseCase") private getInvoicePdfDataUseCase: GetInvoicePdfDataUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetInvoicePdfDataRouteConfig>): Promise<void | APIResponse> {
    const { invoiceNewId } = req.params;
    const invoicePdfData = await this.getInvoicePdfDataUseCase.execute(invoiceNewId);
    return new SuccessResponse<GetInvoicePdfDataResponse>("global.success", invoicePdfData);
  }
}
