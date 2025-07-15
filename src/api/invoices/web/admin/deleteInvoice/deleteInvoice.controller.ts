import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteInvoiceUseCase } from "../../../../../feature/invoices/useCases/DeleteInvoice.usecase";
import { DeleteInvoiceRouteConfig, DeleteInvoiceResponse } from "./deleteInvoice.types";

@Controller()
export class DeleteInvoiceController extends BaseController<DeleteInvoiceRouteConfig> {
  constructor(@inject("DeleteInvoiceUseCase") private deleteInvoiceUseCase: DeleteInvoiceUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteInvoiceRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteInvoiceUseCase.execute({
      invoiceNewId: req.params.invoiceNewId,
    });

    return new SuccessResponse<DeleteInvoiceResponse>("global.success", response);
  }
}
