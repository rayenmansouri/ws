import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AssignTeachersToSubjectsInClassUseCase } from "../../../../../feature/classes/useCases/AssignTeacherToSubjectInClass.usecase";
import {
  AssignTeacherToSubjectInClassRouteConfig,
  AssignTeacherToSubjectInClassResponse,
} from "./assignTeacherToSubjectInClass.types";

@Controller()
export class AssignTeacherToSubjectInClassController extends BaseController<AssignTeacherToSubjectInClassRouteConfig> {
  constructor(
    @inject("AssignTeachersToSubjectsInClassUseCase")
    private assignTeachersToSubjectsInClassUseCase: AssignTeachersToSubjectsInClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<AssignTeacherToSubjectInClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.assignTeachersToSubjectsInClassUseCase.execute({
      teacherSubjectMappings: [req.body],
      classNewId: req.params.classNewId,
    });
    return new SuccessResponse<AssignTeacherToSubjectInClassResponse>("global.success", response);
  }
}
