import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ExamTypeRepo } from "../../../../../feature/examTypes/repos/examType.repo";
import { ListExamTypeUseCase } from "../../../../../feature/examTypes/useCases/listExamType.usecase";
import { ListExamTypesRouteConfig, ListExamTypesResponse } from "./listExamTypes.types";

@Controller()
export class ListExamTypesController extends BaseController<ListExamTypesRouteConfig> {
  constructor(@inject("ListExamTypeUseCase") private listExamTypeUseCase: ListExamTypeUseCase) {
    super();
  }

  async main(req: TypedRequest<ListExamTypesRouteConfig>): Promise<void | APIResponse> {
    const examTypes = await this.listExamTypeUseCase.execute({
      name: req.query.name,
      limit: req.query.limit,
      page: req.query.page,
    });
    return new SuccessResponse<ListExamTypesResponse>("global.success", examTypes);
  }
}
