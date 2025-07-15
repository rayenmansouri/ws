import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnpayInvoiceUseCase } from "../../../../../feature/invoices/useCases/UnpayInvoice.usecase";
import { UnpayInvoiceRouteConfig, UnpayInvoiceResponse } from "./unpayInvoice.types";

@Controller()
export class UnpayInvoiceController extends BaseController<UnpayInvoiceRouteConfig> {
  constructor(@inject("UnpayInvoiceUseCase") private unpayInvoiceUseCase: UnpayInvoiceUseCase) {
    super();
  }

  async main(req: TypedRequest<UnpayInvoiceRouteConfig>): Promise<void | APIResponse> {
    const { invoiceNewId } = req.params;
    const admin = req.user;

    const response = await this.unpayInvoiceUseCase.execute({ invoiceNewId, admin });

    return new SuccessResponse<UnpayInvoiceResponse>("global.success", response);
  }
}
