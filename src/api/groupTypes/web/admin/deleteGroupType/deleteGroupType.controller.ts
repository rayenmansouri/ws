import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteGroupTypeUseCase } from "../../../../../feature/groupType/useCases/DeleteGroupType.usecase";
import { DeleteGroupTypeRouteConfig, DeleteGroupTypeResponse } from "./deleteGroupType.types";

@Controller()
export class DeleteGroupTypeController extends BaseController<DeleteGroupTypeRouteConfig> {
  constructor(
    @inject("DeleteGroupTypeUseCase") private deleteGroupTypeUseCase: DeleteGroupTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteGroupTypeRouteConfig>): Promise<void | APIResponse> {
    const response = await this.deleteGroupTypeUseCase.execute(req.params);
    return new SuccessResponse<DeleteGroupTypeResponse>("global.success", response);
  }
}
