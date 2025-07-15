import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateInvoiceUseCase } from "../../../../../feature/invoices/useCases/UpdateInvoice.usecase";
import { UpdateInvoiceRouteConfig, UpdateInvoiceResponse } from "./updateInvoice.types";

@Controller()
export class UpdateInvoiceController extends BaseController<UpdateInvoiceRouteConfig> {
  constructor(@inject("UpdateInvoiceUseCase") private updateInvoiceUseCase: UpdateInvoiceUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateInvoiceRouteConfig>): Promise<void | APIResponse> {
    const { invoiceNewId } = req.params;
    const response = await this.updateInvoiceUseCase.execute({
      invoiceNewId,
      ...req.body,
    });
    return new SuccessResponse<UpdateInvoiceResponse>("global.success", response);
  }
}
