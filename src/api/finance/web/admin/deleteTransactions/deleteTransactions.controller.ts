import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteTransactionsUseCase } from "../../../../../feature/finance/useCases/DeleteTransactions.usecase";
import {
  DeleteTransactionsRouteConfig,
  DeleteTransactionsResponse,
} from "./deleteTransactions.types";

@Controller()
export class DeleteTransactionsController extends BaseController<DeleteTransactionsRouteConfig> {
  constructor(
    @inject("DeleteTransactionsUseCase")
    private deleteTransactionsUseCase: DeleteTransactionsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteTransactionsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteTransactionsUseCase.execute({
      transactionIds: req.body.ids,
    });
    return new SuccessResponse<DeleteTransactionsResponse>("global.success", response);
  }
}
