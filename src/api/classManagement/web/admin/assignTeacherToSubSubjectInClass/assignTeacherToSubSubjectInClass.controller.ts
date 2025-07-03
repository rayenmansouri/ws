import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AssignTeacherToSubSubjectInClassUseCase } from "../../../../../feature/classes/useCases/AssignTeacherToSubSubjectInClass.usecase";
import {
  AssignTeacherToSubSubjectInClassRouteConfig,
  AssignTeacherToSubSubjectInClassResponse,
} from "./assignTeacherToSubSubjectInClass.types";

@Controller()
export class AssignTeacherToSubSubjectInClassController extends BaseController<AssignTeacherToSubSubjectInClassRouteConfig> {
  constructor(
    @inject("AssignTeacherToSubSubjectInClassUseCase")
    private assignTeacherToSubSubjectInClassUseCase: AssignTeacherToSubSubjectInClassUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<AssignTeacherToSubSubjectInClassRouteConfig>,
  ): Promise<void | APIResponse> {
    const { classNewId } = req.params;
    const response = await this.assignTeacherToSubSubjectInClassUseCase.execute({
      classNewId,
      teacherSubSubjectMappings: [
        { teacherId: req.body.teacherId, subSubjectTypeId: req.body.subSubjectTypeId },
      ],
    });

    return new SuccessResponse<AssignTeacherToSubSubjectInClassResponse>(
      "global.success",
      response,
    );
  }
}
