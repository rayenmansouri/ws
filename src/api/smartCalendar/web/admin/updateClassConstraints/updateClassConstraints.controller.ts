import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateClassConstraintsRouteConfig,
  UpdateClassConstraintsResponse,
} from "./updateClassConstraints.types";
import { inject } from "../../../../../core/container/TypedContainer";
import {
  UpdateClassConstraintsRequestDto,
  UpdateClassConstraintsUseCase,
} from "../../../../../feature/smartCalendar/useCases/updateClassConstraints.usecase";

@Controller()
export class UpdateClassConstraintsController extends BaseController<UpdateClassConstraintsRouteConfig> {
  constructor(
    @inject("UpdateClassConstraintsUseCase")
    private readonly useCase: UpdateClassConstraintsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateClassConstraintsRouteConfig>): Promise<void | APIResponse> {
    const dto: UpdateClassConstraintsRequestDto = {
      classNewId: req.params.classNewId,
      preferredClassroom: req.body.preferredClassroom ?? null,
      maxContinuousHours: req.body.maxContinuousHours ?? null,
      maxHoursPerDay: req.body.maxHoursPerDay ?? null,
      maxGapsPerDay: req.body.maxGapsPerDay ?? null,
    };

    await this.useCase.execute(dto);
    return new SuccessResponse<UpdateClassConstraintsResponse>("global.success");
  }
}
