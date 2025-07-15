import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteGroupUseCase } from "../../../../../feature/groupManagement/useCases/DeleteGroup.usecase";
import { DeleteGroupRouteConfig, DeleteGroupResponse } from "./deleteGroup.types";

@Controller()
export class DeleteGroupController extends BaseController<DeleteGroupRouteConfig> {
  constructor(@inject("DeleteGroupUseCase") private deleteGroupUseCase: DeleteGroupUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteGroupUseCase.execute(req.params.groupNewId);
    return new SuccessResponse<DeleteGroupResponse>("global.success", response);
  }
}
