import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateClassroomUseCase } from "../../../../../feature/classrooms/useCases/UpdateClassroom.usecase";
import { UpdateClassroomRouteConfig, UpdateClassroomResponse } from "./updateClassroom.types";

@Controller()
export class UpdateClassroomController extends BaseController<UpdateClassroomRouteConfig> {
  constructor(
    @inject("UpdateClassroomUseCase") private updateClassroomUseCase: UpdateClassroomUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateClassroomRouteConfig>): Promise<void | APIResponse> {
    const dto = { ...req.body };

    if (dto.allowAllSessionTypes === true) dto.sessionTypes = [];
    if (dto.allowAllSubjects === false) dto.subjectTypes = [];

    if (dto.subjectTypes) dto.allowAllSubjects = false;
    if (dto.sessionTypes) dto.allowAllSessionTypes = false;

    await this.updateClassroomUseCase.execute(req.params.classroomNewId, dto);

    return new SuccessResponse<UpdateClassroomResponse>("global.success");
  }
}
