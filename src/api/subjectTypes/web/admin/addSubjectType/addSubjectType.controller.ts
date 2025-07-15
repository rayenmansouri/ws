import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSubjectTypeUseCase } from "../../../../../feature/subjectTypes/useCases/AddSubjectType.usecase";
import { AddSubjectTypeRouteConfig, AddSubjectTypeResponse } from "./addSubjectType.types";

@Controller()
export class AddSubjectTypeController extends BaseController<AddSubjectTypeRouteConfig> {
  constructor(
    @inject("AddSubjectTypeUseCase") private addSubjectTypeUseCase: AddSubjectTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSubjectTypeRouteConfig>): Promise<void | APIResponse> {
    await this.addSubjectTypeUseCase.execute(req.body);
    return new SuccessResponse<AddSubjectTypeResponse>("subjectType.addedSuccessfully");
  }
}
