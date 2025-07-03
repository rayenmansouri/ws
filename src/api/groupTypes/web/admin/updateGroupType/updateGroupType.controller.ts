import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateGroupTypeUseCase } from "../../../../../feature/groupType/useCases/UpdateGroupType.usecase";
import { UpdateGroupTypeResponse, UpdateGroupTypeRouteConfig } from "./updateGroupType.types";

@Controller()
export class UpdateGroupTypeController extends BaseController<UpdateGroupTypeRouteConfig> {
  constructor(
    @inject("UpdateGroupTypeUseCase") private updateGroupTypeUseCase: UpdateGroupTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateGroupTypeRouteConfig>): Promise<void | APIResponse> {
    const { groupTypeNewId } = req.params;
    const response = await this.updateGroupTypeUseCase.execute({
      groupTypeNewId,
      ...req.body,
    });
    return new SuccessResponse<UpdateGroupTypeResponse>("global.success", response);
  }
}
