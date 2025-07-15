import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddClassroomUseCase } from "../../../../../feature/classrooms/useCases/AddClassroom.usecase";
import { AddClassroomRouteConfig, AddClassroomResponse } from "./addClassroom.types";

@Controller()
export class AddClassroomController extends BaseController<AddClassroomRouteConfig> {
  constructor(@inject("AddClassroomUseCase") private addClassroomUseCase: AddClassroomUseCase) {
    super();
  }

  async main(req: TypedRequest<AddClassroomRouteConfig>): Promise<void | APIResponse> {
    await this.addClassroomUseCase.execute({
      ...req.body,
      subjectTypes: req.body.subjectTypes ?? [],
      sessionTypes: req.body.sessionTypes ?? [],
      allowAllSessionTypes: req.body.allowAllSessionTypes ?? false,
      allowAllSubjects: req.body.allowAllSubjects ?? false,
    });

    return new SuccessResponse<AddClassroomResponse>("global.success");
  }
}
