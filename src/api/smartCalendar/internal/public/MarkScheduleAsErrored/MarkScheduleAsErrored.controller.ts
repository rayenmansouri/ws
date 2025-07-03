import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  MarkScheduleAsErroredRouteConfig,
  MarkScheduleAsErroredResponse,
} from "./MarkScheduleAsErrored.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { MarkSmartScheduleAsErroredUseCase } from "../../../../../feature/smartCalendar/useCases/MarkSmartScheduleAsErrored.usecase";

@Controller()
export class MarkScheduleAsErroredController extends BaseController<MarkScheduleAsErroredRouteConfig> {
  constructor(
    @inject("MarkSmartScheduleAsErroredUseCase")
    private markSmartScheduleAsErroredUseCase: MarkSmartScheduleAsErroredUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<MarkScheduleAsErroredRouteConfig>): Promise<void | APIResponse> {
    await this.markSmartScheduleAsErroredUseCase.execute(req.params.scheduleId);

    return new SuccessResponse<MarkScheduleAsErroredResponse>("global.success");
  }
}
