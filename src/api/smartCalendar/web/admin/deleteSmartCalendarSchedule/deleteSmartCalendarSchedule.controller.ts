import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  DeleteSmartCalendarScheduleRouteConfig,
  DeleteSmartCalendarScheduleResponse,
} from "./deleteSmartCalendarSchedule.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { DeleteSmartCalendarScheduleUseCase } from "../../../../../feature/smartCalendar/useCases/DeleteSmartCalendarSchedule.usecase";

@Controller()
export class DeleteSmartCalendarScheduleController extends BaseController<DeleteSmartCalendarScheduleRouteConfig> {
  constructor(
    @inject("DeleteSmartCalendarScheduleUseCase")
    private deleteSmartCalendarScheduleUseCase: DeleteSmartCalendarScheduleUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<DeleteSmartCalendarScheduleRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.deleteSmartCalendarScheduleUseCase.execute(req.params.smartCalendarScheduleNewId);

    return new SuccessResponse<DeleteSmartCalendarScheduleResponse>(
      "smartCalendar.scheduleDeletedSuccessfully",
    );
  }
}
