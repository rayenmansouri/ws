import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnAssignTeacherFromSubjectUseCase } from "../../../../../feature/classes/useCases/UnAssignTeacherFromSubject.usecase";
import {
  UnAssignTeacherFromSubjectRouteConfig,
  UnAssignTeacherFromSubjectResponse,
} from "./unAssignTeacherFromSubject.types";

@Controller()
export class UnAssignTeacherFromSubjectController extends BaseController<UnAssignTeacherFromSubjectRouteConfig> {
  constructor(
    @inject("UnAssignTeacherFromSubjectUseCase")
    private unAssignTeacherFromSubjectUseCase: UnAssignTeacherFromSubjectUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UnAssignTeacherFromSubjectRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.unAssignTeacherFromSubjectUseCase.execute({
      subjectTypeId: req.params.subjectTypeId,
      classNewId: req.params.classNewId,
    });
    return new SuccessResponse<UnAssignTeacherFromSubjectResponse>("global.success", response);
  }
}
