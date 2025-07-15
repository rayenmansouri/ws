import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateExamTypeUseCase } from "../../../../../feature/examTypes/useCases/UpdateExamType.usecase";
import { UpdateExamTypeRouteConfig, UpdateExamTypeResponse } from "./updateExamType.types";

@Controller()
export class UpdateExamTypeController extends BaseController<UpdateExamTypeRouteConfig> {
  constructor(
    @inject("UpdateExamTypeUseCase") private updateExamTypeUseCase: UpdateExamTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateExamTypeRouteConfig>): Promise<void | APIResponse> {
    await this.updateExamTypeUseCase.execute(req.params.examTypeNewId, req.body);
    return new SuccessResponse<UpdateExamTypeResponse>("");
  }
}
