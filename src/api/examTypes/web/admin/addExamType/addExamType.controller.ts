import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddExamTypeUseCase } from "../../../../../feature/examTypes/useCases/AddExamType.usecase";
import { AddExamTypeRouteConfig, AddExamTypeResponse } from "./addExamType.types";

@Controller()
export class AddExamTypeController extends BaseController<AddExamTypeRouteConfig> {
  constructor(@inject("AddExamTypeUseCase") private addExamTypeUseCase: AddExamTypeUseCase) {
    super();
  }

  async main(req: TypedRequest<AddExamTypeRouteConfig>): Promise<void | APIResponse> {
    await this.addExamTypeUseCase.execute(req.body);
    return new SuccessResponse<AddExamTypeResponse>("global.success");
  }
}
