import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ApplySmartCalendarScheduleUseCase } from "../../../../../feature/smartCalendar/useCases/ApplySmartCalendarSchedule.usecase";
import {
  ApplySmartCalendarScheduleRouteConfig,
  ApplySmartCalendarScheduleResponse,
} from "./applySmartCalendarSchedule.types";

@Controller()
export class ApplySmartCalendarScheduleController extends BaseController<ApplySmartCalendarScheduleRouteConfig> {
  constructor(
    @inject("ApplySmartCalendarScheduleUseCase")
    private applySmartCalendarScheduleUseCase: ApplySmartCalendarScheduleUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ApplySmartCalendarScheduleRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.applySmartCalendarScheduleUseCase.execute(req.params.smartCalendarScheduleNewId);

    return new SuccessResponse<ApplySmartCalendarScheduleResponse>(
      "smartCalendar.scheduleAppliedSuccessfully",
    );
  }
}
