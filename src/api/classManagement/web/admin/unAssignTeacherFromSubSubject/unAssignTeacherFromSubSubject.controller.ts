import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UnAssignTeacherFromSubSubjectUseCase } from "../../../../../feature/classes/useCases/UnAssignTeacherFromSubSubject.usecase";
import {
  UnAssignTeacherFromSubSubjectRouteConfig,
  UnAssignTeacherFromSubSubjectResponse,
} from "./unAssignTeacherFromSubSubject.types";

@Controller()
export class UnAssignTeacherFromSubSubjectController extends BaseController<UnAssignTeacherFromSubSubjectRouteConfig> {
  constructor(
    @inject("UnAssignTeacherFromSubSubjectUseCase")
    private readonly unAssignTeacherFromSubSubjectUseCase: UnAssignTeacherFromSubSubjectUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UnAssignTeacherFromSubSubjectRouteConfig>,
  ): Promise<void | APIResponse> {
    const { classNewId, subSubjectTypeId } = req.params;
    const response = await this.unAssignTeacherFromSubSubjectUseCase.execute({
      classNewId,
      subSubjectTypeId,
    });
    return new SuccessResponse<UnAssignTeacherFromSubSubjectResponse>("global.success", response);
  }
}
