import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateSessionStatusRouteConfig,
  UpdateSessionStatusResponse,
} from "./updateSessionStatus.types";
import { inject } from "../../../../../core/container/TypedContainer";
import {
  UpdateSessionStatusUseCase,
  UpdateSessionStatusRequestDTO,
} from "../../../../../feature/sessionManagement/useCases/updateSessionStatus.usecase";

@Controller()
export class UpdateSessionStatusController extends BaseController<UpdateSessionStatusRouteConfig> {
  constructor(
    @inject("UpdateSessionStatusUseCase")
    private readonly updateSessionStatusUseCase: UpdateSessionStatusUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSessionStatusRouteConfig>): Promise<void | APIResponse> {
    const dto: UpdateSessionStatusRequestDTO = {
      sessionNewId: req.params.sessionNewId,
      userId: req.user._id,
      userType: req.userType as "admin",
      tenantId: req.tenantId,
      newStatus: req.body.newStatus,
    };
    await this.updateSessionStatusUseCase.execute(dto);
    return new SuccessResponse<UpdateSessionStatusResponse>("global.success");
  }
}
