import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateExpenseUseCase } from "../../../../../feature/expenses/useCases/UpdateExpense.usecase";
import { UpdateExpenseResponse, UpdateExpenseRouteConfig } from "./updateExpense.types";

@Controller()
export class UpdateExpenseController extends BaseController<UpdateExpenseRouteConfig> {
  constructor(@inject("UpdateExpenseUseCase") private updateExpenseUseCase: UpdateExpenseUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateExpenseRouteConfig>): Promise<void | APIResponse> {
    await this.updateExpenseUseCase.execute(req.params.expenseNewId, req.body);

    return new SuccessResponse<UpdateExpenseResponse>("expenses.updatedSuccessfully");
  }
}
