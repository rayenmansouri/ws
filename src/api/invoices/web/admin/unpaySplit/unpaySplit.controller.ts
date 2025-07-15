import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnpaySplitUseCase } from "../../../../../feature/invoices/useCases/UnpaySplit.usecase";
import { UnpaySplitRouteConfig, UnpaySplitResponse } from "./unpaySplit.types";

@Controller()
export class UnpaySplitController extends BaseController<UnpaySplitRouteConfig> {
  constructor(@inject("UnpaySplitUseCase") private unpaySplitUseCase: UnpaySplitUseCase) {
    super();
  }

  async main(req: TypedRequest<UnpaySplitRouteConfig>): Promise<void | APIResponse> {
    const { invoiceNewId, splitIndex } = req.params;
    const admin = req.user;
    const dto = { invoiceNewId, splitIndex, admin };
    const response = await this.unpaySplitUseCase.execute(dto);
    return new SuccessResponse<UnpaySplitResponse>("global.success", response);
  }
}
