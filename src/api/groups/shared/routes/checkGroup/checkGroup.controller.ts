import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { CheckGroupUseCase } from "../../../../../feature/groupManagement/useCases/CheckGroup.usecase";
import { CheckGroupRouteConfig, CheckGroupResponse } from "./checkGroup.types";

@Controller()
export class CheckGroupController extends BaseController<CheckGroupRouteConfig> {
  constructor(
    @inject("CheckGroupUseCase")
    private checkGroupUseCase: CheckGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<CheckGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.checkGroupUseCase.execute(req.params.groupNewId, {
      type: req.userType!,
      _id: req.user._id,
    });
    return new SuccessResponse<CheckGroupResponse>("global.success", response);
  }
}
