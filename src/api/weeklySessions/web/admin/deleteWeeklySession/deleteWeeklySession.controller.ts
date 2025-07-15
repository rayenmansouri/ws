import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteWeeklySessionUseCase } from "../../../../../feature/weeklySessions/useCases/DeleteWeeklySession.usecase";
import {
  DeleteWeeklySessionRouteConfig,
  DeleteWeeklySessionResponse,
} from "./deleteWeeklySession.types";

@Controller()
export class DeleteWeeklySessionController extends BaseController<DeleteWeeklySessionRouteConfig> {
  constructor(
    @inject("DeleteWeeklySessionUseCase")
    private deleteWeeklySessionUseCase: DeleteWeeklySessionUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteWeeklySessionRouteConfig>): Promise<void | APIResponse> {
    await this.deleteWeeklySessionUseCase.execute(req.params.weeklySessionNewId);
    return new SuccessResponse<DeleteWeeklySessionResponse>("session.deletedSuccessfully");
  }
}
