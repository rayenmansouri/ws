import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteExpenseUseCase } from "../../../../../feature/expenses/useCases/DeleteExpense.usecase";
import { DeleteExpenseResponse, DeleteExpenseRouteConfig } from "./deleteExpense.types";

@Controller()
export class DeleteExpenseController extends BaseController<DeleteExpenseRouteConfig> {
  constructor(@inject("DeleteExpenseUseCase") private deleteExpenseUseCase: DeleteExpenseUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteExpenseRouteConfig>): Promise<void | APIResponse> {
    await this.deleteExpenseUseCase.execute(req.params.expenseNewId);

    return new SuccessResponse<DeleteExpenseResponse>("expenses.deletedSuccessfully");
  }
}
