import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSessionTypeUseCase } from "../../../../../feature/sessionTypes/usecases/UpdateSessionType.usecase";
import { UpdateSessionTypeRouteConfig, UpdateSessionTypeResponse } from "./updateSessionType.types";

@Controller()
export class UpdateSessionTypeController extends BaseController<UpdateSessionTypeRouteConfig> {
  constructor(
    @inject("UpdateSessionTypeUseCase") private updateSessionTypeUseCase: UpdateSessionTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSessionTypeRouteConfig>): Promise<void | APIResponse> {
    await this.updateSessionTypeUseCase.execute(req.params.sessionTypeNewId, req.body);
    return new SuccessResponse<UpdateSessionTypeResponse>("global.success");
  }
}
