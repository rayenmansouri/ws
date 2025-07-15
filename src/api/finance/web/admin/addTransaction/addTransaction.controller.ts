import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  AddTransactionUseCase,
  AddTransactionUseCaseDto,
} from "../../../../../feature/finance/useCases/AddTransaction.usecase";
import { AddTransactionRouteConfig, AddTransactionResponse } from "./addTransaction.types";

@Controller()
export class AddTransactionController extends BaseController<AddTransactionRouteConfig> {
  constructor(
    @inject("AddTransactionUseCase") private addTransactionUseCase: AddTransactionUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddTransactionRouteConfig>): Promise<void | APIResponse> {
    const dto: AddTransactionUseCaseDto = {
      ...req.body,
      supplierNewId: req.body.supplier || null,
      description: req.body.description || null,
      adminId: req.user._id,
      transactionTypeId: req.body.transaction,
      levelId: req.body.level,
    };
    const result = await this.addTransactionUseCase.execute(dto);
    return new SuccessResponse<AddTransactionResponse>("global.success", result);
  }
}
