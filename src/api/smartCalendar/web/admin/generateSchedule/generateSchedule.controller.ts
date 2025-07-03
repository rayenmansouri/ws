import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { Admin } from "../../../../../feature/admins/domain/admin.entity";
import { GenerateScheduleUseCase } from "../../../../../feature/smartCalendar/useCases/GenerateSchedule.usecase";
import { GenerateScheduleRouteConfig, GenerateScheduleResponse } from "./generateSchedule.types";

@Controller()
export class GenerateScheduleController extends BaseController<GenerateScheduleRouteConfig> {
  constructor(
    @inject("GenerateScheduleUseCase")
    private generateScheduleUseCase: GenerateScheduleUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GenerateScheduleRouteConfig>): Promise<void | APIResponse> {
    await this.generateScheduleUseCase.execute(
      req.body.name,
      req.user as unknown as Admin,
      req.tenantId,
    );

    return new SuccessResponse<GenerateScheduleResponse>(
      "smartCalendar.scheduleStartedSuccessfully",
    );
  }
}
