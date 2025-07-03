import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddGroupTypeUseCase } from "../../../../../feature/groupType/useCases/AddGroupType.usecase";
import { AddGroupTypeRouteConfig, AddGroupTypeResponse } from "./addGroupType.types";

@Controller()
export class AddGroupTypeController extends BaseController<AddGroupTypeRouteConfig> {
  constructor(@inject("AddGroupTypeUseCase") private addGroupTypeUseCase: AddGroupTypeUseCase) {
    super();
  }

  async main(req: TypedRequest<AddGroupTypeRouteConfig>): Promise<void | APIResponse> {
    const response = await this.addGroupTypeUseCase.execute(req.body);
    return new SuccessResponse<AddGroupTypeResponse>("global.success", response);
  }
}
