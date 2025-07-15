import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSessionTypeUseCase } from "../../../../../feature/sessionTypes/usecases/DeleteSessionType.usecase";
import { DeleteSessionTypeRouteConfig, DeleteSessionTypeResponse } from "./DeleteSessionType.types";

@Controller()
export class DeleteSessionTypeController extends BaseController<DeleteSessionTypeRouteConfig> {
  constructor(
    @inject("DeleteSessionTypeUseCase") private deleteSessionTypeUseCase: DeleteSessionTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteSessionTypeRouteConfig>): Promise<void | APIResponse> {
    await this.deleteSessionTypeUseCase.execute(req.params.sessionTypeNewId);
    return new SuccessResponse<DeleteSessionTypeResponse>("global.success");
  }
}
