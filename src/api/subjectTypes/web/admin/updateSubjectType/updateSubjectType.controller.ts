import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSubjectTypeUseCase } from "../../../../../feature/subjectTypes/useCases/UpdateSubjectType.usecase";
import { UpdateSubjectTypeRouteConfig, UpdateSubjectTypeResponse } from "./updateSubjectType.types";

@Controller()
export class UpdateSubjectTypeController extends BaseController<UpdateSubjectTypeRouteConfig> {
  constructor(
    @inject("UpdateSubjectTypeUseCase") private updateSubjectTypeUseCase: UpdateSubjectTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSubjectTypeRouteConfig>): Promise<void | APIResponse> {
    await this.updateSubjectTypeUseCase.execute(req.params.subjectTypeNewId, req.body);

    return new SuccessResponse<UpdateSubjectTypeResponse>("subject.updatedSuccessfully");
  }
}
