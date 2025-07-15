import { PayInvoiceUseCase } from "../../../../../feature/invoices/useCases/payInvoice.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { PayInvoiceRouteConfig, PayInvoiceResponse } from "./payInvoice.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class PayInvoiceController extends BaseController<PayInvoiceRouteConfig> {
  constructor(@inject("PayInvoiceUseCase") private readonly payInvoiceUseCase: PayInvoiceUseCase) {
    super();
  }

  async main(req: TypedRequest<PayInvoiceRouteConfig>): Promise<void | APIResponse> {
    await this.payInvoiceUseCase.execute({
      ...req.body,
      invoiceNewId: req.params.invoiceNewId,
      adminId: req.user._id,
      tenantId: req.tenantId,
      phoneNumber: null,
    });
    return new SuccessResponse<PayInvoiceResponse>("global.success");
  }
}
