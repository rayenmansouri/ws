import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateRoleUseCase } from "../../../../../feature/authorization/useCases/UpdateRole.usecase";
import { UpdateRoleRouteConfig, UpdateRoleResponse } from "./updateRole.types";

@Controller()
export class UpdateRoleController extends BaseController<UpdateRoleRouteConfig> {
  constructor(@inject("UpdateRoleUseCase") private updateRoleUseCase: UpdateRoleUseCase) {
    super();
  }

  async main(req: TypedRequest<UpdateRoleRouteConfig>): Promise<void | APIResponse> {
    await this.updateRoleUseCase.execute(req.params.roleNewId, req.body);

    return new SuccessResponse<UpdateRoleResponse>("roleManagement.updatedSuccessfully");
  }
}
