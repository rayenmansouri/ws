import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { inject } from "../../../../../core/container/TypedContainer";
import { UpdateBankCheckUseCase } from "../../../../../feature/studentPayments/useCases/UpdateBankCheck.usecase";
import { UpdateBankCheckRouteConfig, UpdateBankCheckResponse } from "./updateBankCheck.types";

@Controller()
export class UpdateBankCheckController extends BaseController<UpdateBankCheckRouteConfig> {
  constructor(
    @inject("UpdateBankCheckUseCase") private updateBankCheckUseCase: UpdateBankCheckUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateBankCheckRouteConfig>): Promise<void | APIResponse> {
    await this.updateBankCheckUseCase.execute(req.params.bankCheckNewId, req.body);

    return new SuccessResponse<UpdateBankCheckResponse>("bankCheck.updateSuccessfully");
  }
}
