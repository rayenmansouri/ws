import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSubSubjectTypeUsecase } from "../../../../../feature/subSubjectTypes/usecases/UpdateSubSubjectType.usecase";
import {
  UpdateSubSubjectTypeRouteConfig,
  UpdateSubSubjectTypeResponse,
} from "./updateSubSubjectType.types";

@Controller()
export class UpdateSubSubjectTypeController extends BaseController<UpdateSubSubjectTypeRouteConfig> {
  constructor(
    @inject("UpdateSubSubjectTypeUsecase")
    private updateSubSubjectTypeUsecase: UpdateSubSubjectTypeUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSubSubjectTypeRouteConfig>): Promise<void | APIResponse> {
    await this.updateSubSubjectTypeUsecase.execute(req.params.subSubjectTypeNewId, req.body);

    return new SuccessResponse<UpdateSubSubjectTypeResponse>("subSubjectType.updatedSuccessfully");
  }
}
