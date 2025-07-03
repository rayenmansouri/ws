import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteSessionUseCase } from "../../../../../feature/schedules/useCases/DeleteSession.usecase";
import { DeleteSessionRouteConfig, DeleteSessionResponse } from "./deleteSession.types";

@Controller()
export class DeleteSessionController extends BaseController<DeleteSessionRouteConfig> {
  constructor(@inject("DeleteSessionUseCase") private deleteSessionUseCase: DeleteSessionUseCase) {
    super();
  }

  async main(req: TypedRequest<DeleteSessionRouteConfig>): Promise<void | APIResponse> {
    await this.deleteSessionUseCase.execute(req.params.sessionNewId);
    return new SuccessResponse<DeleteSessionResponse>("session.deletedSuccessfully");
  }
}
