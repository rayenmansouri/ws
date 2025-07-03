import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ApplyWeeklyScheduleForClassUseCase } from "../../../../../feature/schedules/useCases/ApplyWeeklyScheduleForClass.usecase";
import {
  ApplyWeeklyScheduleForClassRouteConfig,
  ApplyWeeklyScheduleForClassResponse,
} from "./applyWeeklyScheduleForClass.types";

@Controller()
export class ApplyWeeklyScheduleForClassController extends BaseController<ApplyWeeklyScheduleForClassRouteConfig> {
  constructor(
    @inject("ApplyWeeklyScheduleForClassUseCase")
    private applyWeeklyScheduleForClassUseCase: ApplyWeeklyScheduleForClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ApplyWeeklyScheduleForClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.applyWeeklyScheduleForClassUseCase.execute(req.body.classNewId);

    return new SuccessResponse<ApplyWeeklyScheduleForClassResponse>("global.success", response);
  }
}
