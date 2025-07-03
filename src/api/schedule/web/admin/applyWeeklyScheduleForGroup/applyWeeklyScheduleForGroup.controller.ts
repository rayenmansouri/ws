import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ApplyWeeklyScheduleForGroupUseCase } from "../../../../../feature/schedules/useCases/ApplyWeeklyScheduleForGroup.usecase";
import {
  ApplyWeeklyScheduleForGroupRouteConfig,
  ApplyWeeklyScheduleForGroupResponse,
} from "./applyWeeklyScheduleForGroup.types";

@Controller()
export class ApplyWeeklyScheduleForGroupController extends BaseController<ApplyWeeklyScheduleForGroupRouteConfig> {
  constructor(
    @inject("ApplyWeeklyScheduleForGroupUseCase")
    private applyWeeklyScheduleForGroupUseCase: ApplyWeeklyScheduleForGroupUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ApplyWeeklyScheduleForGroupRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.applyWeeklyScheduleForGroupUseCase.execute(req.body.groupNewId);

    return new SuccessResponse<ApplyWeeklyScheduleForGroupResponse>("global.success", response);
  }
}
