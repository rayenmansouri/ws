import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSessionForClassUseCase } from "../../../../../feature/sessionManagement/useCases/UpdateSessionForClass.usecase";
import {
  UpdateSessionForClassRouteConfig,
  UpdateSessionForClassResponse,
} from "./updateSessionForClass.types";

@Controller()
export class UpdateSessionForClassController extends BaseController<UpdateSessionForClassRouteConfig> {
  constructor(
    @inject("UpdateSessionForClassUseCase")
    private updateSessionForClassUseCase: UpdateSessionForClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSessionForClassRouteConfig>): Promise<void | APIResponse> {
    const { sessionNewId } = req.params;
    const response = await this.updateSessionForClassUseCase.execute(sessionNewId, req.body);
    return new SuccessResponse<UpdateSessionForClassResponse>("global.success", response);
  }
}
