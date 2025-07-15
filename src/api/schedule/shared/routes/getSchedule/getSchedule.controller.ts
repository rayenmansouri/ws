import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetScheduleUseCase } from "../../../../../feature/schedules/useCases/GetSchedule.usecase";
import { GetScheduleRouteConfig, GetScheduleResponse } from "./getSchedule.types";

@Controller()
export class GetScheduleController extends BaseController<GetScheduleRouteConfig> {
  constructor(@inject("GetScheduleUseCase") private getScheduleUseCase: GetScheduleUseCase) {
    super();
  }

  async main(req: TypedRequest<GetScheduleRouteConfig>): Promise<void | APIResponse> {
    const schedule = await this.getScheduleUseCase.execute(req.query);
    return new SuccessResponse<GetScheduleResponse>("global.success", schedule);
  }
}
