import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddExpenseUseCase } from "../../../../../feature/expenses/useCases/AddExpense.usecase";
import { AddExpenseResponse, AddExpenseRouteConfig } from "./addExpense.types";

@Controller()
export class AddExpenseController extends BaseController<AddExpenseRouteConfig> {
  constructor(@inject("AddExpenseUseCase") private addExpenseUseCase: AddExpenseUseCase) {
    super();
  }

  async main(req: TypedRequest<AddExpenseRouteConfig>): Promise<void | APIResponse> {
    await this.addExpenseUseCase.execute(req.body);

    return new SuccessResponse<AddExpenseResponse>("expenses.addedSuccessfully");
  }
}
