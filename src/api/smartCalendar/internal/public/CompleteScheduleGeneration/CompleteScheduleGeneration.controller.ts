import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { CompleteScheduleGenerationUseCase } from "../../../../../feature/smartCalendar/useCases/CompleteScheduleGeneration.usecase";
import {
  CompleteScheduleGenerationRouteConfig,
  CompleteScheduleGenerationResponse,
} from "./CompleteScheduleGeneration.types";

@Controller()
export class CompleteScheduleGenerationController extends BaseController<CompleteScheduleGenerationRouteConfig> {
  constructor(
    @inject("CompleteScheduleGenerationUseCase")
    private completeScheduleGenerationUseCase: CompleteScheduleGenerationUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<CompleteScheduleGenerationRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.completeScheduleGenerationUseCase.execute(
      req.params.scheduleId,
      req.body.activities,
    );

    return new SuccessResponse<CompleteScheduleGenerationResponse>("");
  }
}
