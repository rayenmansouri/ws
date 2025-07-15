import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteExamTypeUseCase } from "../../../../../feature/examTypes/useCases/DeleteExamType.usecase";
import { DeleteExamTypeRouteConfig, DeleteExamTypeResponse } from "./deleteExamType.types";

@Controller()
export class DeleteExamTypeController extends BaseController<DeleteExamTypeRouteConfig> {
  constructor(
    @inject("DeleteExamTypeUseCase") private deleteExamTypeUseCase: DeleteExamTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteExamTypeRouteConfig>): Promise<void | APIResponse> {
    await this.deleteExamTypeUseCase.execute(req.params.examTypeNewId);
    return new SuccessResponse<DeleteExamTypeResponse>("global.success");
  }
}
