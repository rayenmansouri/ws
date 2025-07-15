import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { MergeInvoicesUseCase } from "../../../../../feature/invoices/useCases/MergeInvoices.usecase";
import { MergeInvoicesRouteConfig, MergeInvoicesResponse } from "./mergeInvoices.types";

@Controller()
export class MergeInvoicesController extends BaseController<MergeInvoicesRouteConfig> {
  constructor(
    @inject("MergeInvoicesUseCase") private readonly mergeInvoicesUseCase: MergeInvoicesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<MergeInvoicesRouteConfig>): Promise<void | APIResponse> {
    const response = await this.mergeInvoicesUseCase.execute({
      invoiceIds: req.body.invoices,
      admin: req.user,
    });
    return new SuccessResponse<MergeInvoicesResponse>("global.success", response);
  }
}
