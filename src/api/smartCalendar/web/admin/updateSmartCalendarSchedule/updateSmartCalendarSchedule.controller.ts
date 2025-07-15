import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSmartCalendarScheduleUseCase } from "../../../../../feature/smartCalendar/useCases/UpdateSmartCalendarSchedule.usecase";
import {
  UpdateSmartCalendarScheduleRouteConfig,
  UpdateSmartCalendarScheduleResponse,
} from "./updateSmartCalendarSchedule.types";

@Controller()
export class UpdateSmartCalendarScheduleController extends BaseController<UpdateSmartCalendarScheduleRouteConfig> {
  constructor(
    @inject("UpdateSmartCalendarScheduleUseCase")
    private updateSmartCalendarScheduleUseCase: UpdateSmartCalendarScheduleUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateSmartCalendarScheduleRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.updateSmartCalendarScheduleUseCase.execute({
      newId: req.params.smartCalendarScheduleNewId,
      name: req.body.name,
    });

    return new SuccessResponse<UpdateSmartCalendarScheduleResponse>(
      "smartCalendar.scheduleUpdatedSuccessfully",
    );
  }
}
