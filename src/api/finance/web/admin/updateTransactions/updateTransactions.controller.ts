import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateTransactionsUseCase } from "../../../../../feature/finance/useCases/UpdateTransactions.usecase";
import {
  UpdateTransactionsRouteConfig,
  UpdateTransactionsResponse,
} from "./updateTransactions.types";

@Controller()
export class UpdateTransactionsController extends BaseController<UpdateTransactionsRouteConfig> {
  constructor(
    @inject("UpdateTransactionsUseCase")
    private updateTransactionsUseCase: UpdateTransactionsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateTransactionsRouteConfig>): Promise<void | APIResponse> {
    const { transactionId } = req.params;

    const response = await this.updateTransactionsUseCase.execute({
      ...req.body,
      transactionId,
    });
    return new SuccessResponse<UpdateTransactionsResponse>("global.success", response);
  }
}
