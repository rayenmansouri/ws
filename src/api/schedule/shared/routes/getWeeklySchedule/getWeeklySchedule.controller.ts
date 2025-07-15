import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetNonDraftWeeklyScheduleUseCase } from "../../../../../feature/weeklySchedule/useCases/GetNonDraftWeeklySchedule.usecase";
import { GetWeeklyScheduleRouteConfig, GetWeeklyScheduleResponse } from "./getWeeklySchedule.types";

@Controller()
export class GetWeeklyScheduleController extends BaseController<GetWeeklyScheduleRouteConfig> {
  constructor(
    @inject("GetNonDraftWeeklyScheduleUseCase")
    private getNonDraftWeeklyScheduleUseCase: GetNonDraftWeeklyScheduleUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetWeeklyScheduleRouteConfig>): Promise<void | APIResponse> {
    const weeklySchedule = await this.getNonDraftWeeklyScheduleUseCase.execute(req.query);

    return new SuccessResponse<GetWeeklyScheduleResponse>("global.success", {
      schedule: weeklySchedule,
    });
  }
}
