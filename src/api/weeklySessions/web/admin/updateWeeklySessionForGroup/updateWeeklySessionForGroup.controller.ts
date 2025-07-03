import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateWeeklySessionForGroupUseCase } from "../../../../../feature/weeklySessions/useCases/UpdateWeeklySessionForGroup.usecase";
import {
  UpdateWeeklySessionForGroupRouteConfig,
  UpdateWeeklySessionForGroupResponse,
} from "./updateWeeklySessionForGroup.types";

@Controller()
export class UpdateWeeklySessionForGroupController extends BaseController<UpdateWeeklySessionForGroupRouteConfig> {
  constructor(
    @inject("UpdateWeeklySessionForGroupUseCase")
    private updateWeeklySessionForGroupUseCase: UpdateWeeklySessionForGroupUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateWeeklySessionForGroupRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.updateWeeklySessionForGroupUseCase.execute(
      req.params.weeklySessionNewId,
      req.body,
    );
    return new SuccessResponse<UpdateWeeklySessionForGroupResponse>("global.success", response);
  }
}
