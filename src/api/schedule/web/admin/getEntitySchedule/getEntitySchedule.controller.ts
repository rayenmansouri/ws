import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetEntityScheduleUseCase } from "../../../../../feature/schedules/useCases/GetEntitySchedule.usecase";
import { GetEntityScheduleRouteConfig, GetEntityScheduleResponse } from "./getEntitySchedule.types";

@Controller()
export class GetEntityScheduleController extends BaseController<GetEntityScheduleRouteConfig> {
  constructor(
    @inject("GetEntityScheduleUseCase") private getEntityScheduleUseCase: GetEntityScheduleUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetEntityScheduleRouteConfig>): Promise<void | APIResponse> {
    const { search } = req.query;
    const result = await this.getEntityScheduleUseCase.execute({ search });
    return new SuccessResponse<GetEntityScheduleResponse>("global.success", result);
  }
}
