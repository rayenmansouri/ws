import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddSubSubjectTypeUseCase } from "../../../../../feature/subSubjectTypes/usecases/AddSubSubjectType.usecase";
import { AddSubSubjectTypeRouteConfig, AddSubSubjectTypeResponse } from "./addSubSubjectType.types";

@Controller()
export class AddSubSubjectTypeController extends BaseController<AddSubSubjectTypeRouteConfig> {
  constructor(
    @inject("AddSubSubjectTypeUseCase")
    private addSubSubjectTypeUseCase: AddSubSubjectTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddSubSubjectTypeRouteConfig>): Promise<void | APIResponse> {
    await this.addSubSubjectTypeUseCase.execute(req.body);
    return new SuccessResponse<AddSubSubjectTypeResponse>("subSubjectType.addedSuccessfully");
  }
}
