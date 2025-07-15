import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddRoleUseCase } from "../../../../../feature/authorization/useCases/AddRole.usecase";
import { AddRoleRouteConfig, AddRoleResponse } from "./addRole.types";

@Controller()
export class AddRoleController extends BaseController<AddRoleRouteConfig> {
  constructor(@inject("AddRoleUseCase") private addRoleUseCase: AddRoleUseCase) {
    super();
  }

  async main(req: TypedRequest<AddRoleRouteConfig>): Promise<void | APIResponse> {
    await this.addRoleUseCase.execute(req.body);

    return new SuccessResponse<AddRoleResponse>("roleManagement.createdSuccessfully");
  }
}
