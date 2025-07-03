import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteRoleUseCase } from "../../../../../feature/authorization/useCases/DeleteRole.usecase";
import { DeleteRoleRouteConfig, DeleteRoleResponse } from "./deleteRole.types";

@Controller()
export class DeleteRoleController extends BaseController<DeleteRoleRouteConfig> {
  constructor(@inject("DeleteRoleUseCase") private deleteRoleUseCase: DeleteRoleUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteRoleRouteConfig>): Promise<void | APIResponse> {
    await this.deleteRoleUseCase.execute(req.params.roleNewId);

    return new SuccessResponse<DeleteRoleResponse>("roleManagement.deletedSuccessfully");
  }
}
