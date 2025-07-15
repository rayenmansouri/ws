import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSessionForGroupUseCase } from "../../../../../feature/sessionManagement/useCases/UpdateSessionForGroup.usecase";
import {
  UpdateSessionForGroupRouteConfig,
  UpdateSessionForGroupResponse,
} from "./updateSessionForGroup.types";

@Controller()
export class UpdateSessionForGroupController extends BaseController<UpdateSessionForGroupRouteConfig> {
  constructor(
    @inject("UpdateSessionForGroupUseCase")
    private updateSessionForGroupUseCase: UpdateSessionForGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSessionForGroupRouteConfig>): Promise<void | APIResponse> {
    const { sessionNewId } = req.params;

    const result = await this.updateSessionForGroupUseCase.execute(sessionNewId, req.body);
    return new SuccessResponse<UpdateSessionForGroupResponse>("global.success", result);
  }
}
