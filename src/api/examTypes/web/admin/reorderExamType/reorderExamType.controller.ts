import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ReorderExamTypeUseCase } from "../../../../../feature/examTypes/useCases/ReorderExamType.usecase";
import { ReorderExamTypeRouteConfig, ReorderExamTypeResponse } from "./reorderExamType.types";

@Controller()
export class ReorderExamTypeController extends BaseController<ReorderExamTypeRouteConfig> {
  constructor(
    @inject("ReorderExamTypeUseCase") private reorderExamTypeUseCase: ReorderExamTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ReorderExamTypeRouteConfig>): Promise<void | APIResponse> {
    await this.reorderExamTypeUseCase.execute(req.params.examTypeNewId, req.body.newRank);
    return new SuccessResponse<ReorderExamTypeResponse>("global.success");
  }
}
