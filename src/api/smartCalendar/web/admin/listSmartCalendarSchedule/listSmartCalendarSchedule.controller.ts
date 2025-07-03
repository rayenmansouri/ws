import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListSmartCalendarSchedulesUseCase } from "../../../../../feature/smartCalendar/useCases/ListSmartCalendarSchedules.usecase";
import {
  ListSmartCalendarScheduleRouteConfig,
  ListSmartCalendarScheduleResponse,
} from "./listSmartCalendarSchedule.types";

@Controller()
export class ListSmartCalendarScheduleController extends BaseController<ListSmartCalendarScheduleRouteConfig> {
  constructor(
    @inject("ListSmartCalendarSchedulesUseCase")
    private listSmartCalendarSchedulesUseCase: ListSmartCalendarSchedulesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListSmartCalendarScheduleRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listSmartCalendarSchedulesUseCase.execute(
      {
        search: req.query.search,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListSmartCalendarScheduleResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
