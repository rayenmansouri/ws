import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  CancelSmartCalendarScheduleRouteConfig,
  CancelSmartCalendarScheduleResponse,
} from "./cancelSmartCalendarSchedule.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { CancelSmartCalendarScheduleUseCase } from "../../../../../feature/smartCalendar/useCases/CancelSmartCalendarSchedule.usecase";

@Controller()
export class CancelSmartCalendarScheduleController extends BaseController<CancelSmartCalendarScheduleRouteConfig> {
  constructor(
    @inject("CancelSmartCalendarScheduleUseCase")
    private cancelSmartCalendarScheduleUseCase: CancelSmartCalendarScheduleUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<CancelSmartCalendarScheduleRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.cancelSmartCalendarScheduleUseCase.execute(req.params.smartCalendarScheduleNewId);

    return new SuccessResponse<CancelSmartCalendarScheduleResponse>(
      "smartCalendar.scheduleCancelledSuccessfully",
    );
  }
}
