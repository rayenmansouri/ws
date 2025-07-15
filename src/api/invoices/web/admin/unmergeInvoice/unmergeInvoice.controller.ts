import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnmergeInvoiceUseCase } from "../../../../../feature/invoices/useCases/UnmergeInvoice.usecase";
import { UnmergeInvoiceRouteConfig, UnmergeInvoiceResponse } from "./unmergeInvoice.types";

@Controller()
export class UnmergeInvoiceController extends BaseController<UnmergeInvoiceRouteConfig> {
  constructor(
    @inject("UnmergeInvoiceUseCase") private unmergeInvoiceUseCase: UnmergeInvoiceUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UnmergeInvoiceRouteConfig>): Promise<void | APIResponse> {
    const { invoiceNewId } = req.params;

    const dto = { invoiceNewId };
    const response = await this.unmergeInvoiceUseCase.execute(dto);
    return new SuccessResponse<UnmergeInvoiceResponse>("global.success", response);
  }
}
