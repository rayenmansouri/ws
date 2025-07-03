import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetDraftWeeklyScheduleUseCase } from "../../../../../feature/weeklySchedule/useCases/GetDraftWeeklySchedule.usecase";
import {
  GetDraftWeeklyScheduleResponse,
  GetDraftWeeklyScheduleRouteConfig,
} from "./getDraftWeeklySchedule.types";

@Controller()
export class GetDraftWeeklyScheduleController extends BaseController<GetDraftWeeklyScheduleRouteConfig> {
  constructor(
    @inject("GetDraftWeeklyScheduleUseCase")
    private getDraftWeeklyScheduleUseCase: GetDraftWeeklyScheduleUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetDraftWeeklyScheduleRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getDraftWeeklyScheduleUseCase.execute(req.query);
    return new SuccessResponse<GetDraftWeeklyScheduleResponse>("global.success", result);
  }
}
