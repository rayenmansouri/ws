import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateNotAvailableTimesUseCase } from "../../../../../feature/smartCalendar/useCases/updateNotAvailableTimes.usecase";
import {
  UpdateNotAvailableTimesResponse,
  UpdateNotAvailableTimesRouteConfig,
} from "./updateNotAvailableTimes.types";

@Controller()
export class UpdateNotAvailableTimesController extends BaseController<UpdateNotAvailableTimesRouteConfig> {
  constructor(
    @inject("UpdateNotAvailableTimesUseCase")
    private readonly usecase: UpdateNotAvailableTimesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateNotAvailableTimesRouteConfig>): Promise<void | APIResponse> {
    await this.usecase.execute(
      req.body.newId || null,
      req.body.entity,
      req.body.notAvailableTimes || [],
      req.tenantId,
    );
    return new SuccessResponse<UpdateNotAvailableTimesResponse>("global.success");
  }
}
