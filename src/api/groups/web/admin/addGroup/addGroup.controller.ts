import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddGroupUseCase } from "../../../../../feature/groupManagement/useCases/AddGroup.usecase";
import { AddGroupRouteConfig, AddGroupResponse } from "./addGroup.types";

@Controller()
export class AddGroupController extends BaseController<AddGroupRouteConfig> {
  constructor(@inject("AddGroupUseCase") private addGroupUsecase: AddGroupUseCase) {
    super();
  }

  async main(req: TypedRequest<AddGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addGroupUsecase.execute({
      ...req.body,
      studentNewIds: [],
    });
    return new SuccessResponse<AddGroupResponse>("global.success", response);
  }
}
