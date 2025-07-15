import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  UpdateTeacherConstraintsRouteConfig,
  UpdateTeacherConstraintsResponse,
} from "./updateTeacherConstraints.types";
import {
  UpdateTeacherConstraintsUseCase,
  UpdateTeacherConstraintsRequestDto,
} from "../../../../../feature/smartCalendar/useCases/updateTeacherConstraints.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class UpdateTeacherConstraintsController extends BaseController<UpdateTeacherConstraintsRouteConfig> {
  constructor(
    @inject("UpdateTeacherConstraintsUseCase") private usecase: UpdateTeacherConstraintsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateTeacherConstraintsRouteConfig>): Promise<void | APIResponse> {
    const dto: UpdateTeacherConstraintsRequestDto = {
      teacherNewId: req.params.teacherNewId,
      preferredClassroom: req.body.preferredClassroom ?? null,
      maxDaysPerWeek: req.body.maxDaysPerWeek ?? null,
      maxGapsPerDay: req.body.maxGapsPerDay ?? null,
      maxHoursPerDay: req.body.maxHoursPerDay ?? null,
    };

    await this.usecase.execute(dto);
    return new SuccessResponse<UpdateTeacherConstraintsResponse>("global.success");
  }
}
