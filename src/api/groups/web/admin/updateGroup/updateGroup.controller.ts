import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateGroupUseCase } from "../../../../../feature/groupManagement/useCases/UpdateGroup.usecase";
import { UpdateGroupRouteConfig, UpdateGroupResponse } from "./updateGroup.types";

@Controller()
export class UpdateGroupController extends BaseController<UpdateGroupRouteConfig> {
  constructor(@inject("UpdateGroupUseCase") private updateGroupUseCase: UpdateGroupUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.updateGroupUseCase.execute(req.params.groupNewId, req.body);
    return new SuccessResponse<UpdateGroupResponse>("global.success", response);
  }
}
