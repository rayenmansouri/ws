import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetOneRoleUseCase } from "../../../../../feature/authorization/useCases/GetOneRole.usecase";
import { GetOneRoleRouteConfig, GetOneRoleResponse } from "./getOneRole.types";

@Controller()
export class GetOneRoleController extends BaseController<GetOneRoleRouteConfig> {
  constructor(@inject("GetOneRoleUseCase") private getOneRoleUseCase: GetOneRoleUseCase) {
    super();
  }

  async main(req: TypedRequest<GetOneRoleRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getOneRoleUseCase.execute(req.params.roleNewId);

    return new SuccessResponse<GetOneRoleResponse>("global.success", response);
  }
}
