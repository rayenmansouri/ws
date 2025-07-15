import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGradesOfCambridgeSubjectUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetGradesOfCambridgeSubject.usecase";
import {
  GetGradesOfCambridgeSubjectRouteConfig,
  GetGradesOfCambridgeSubjectResponse,
} from "./getGradesOfCambridgeSubject.types";

@Controller()
export class GetGradesOfCambridgeSubjectController extends BaseController<GetGradesOfCambridgeSubjectRouteConfig> {
  constructor(
    @inject("GetGradesOfCambridgeSubjectUseCase")
    private getGradesOfCambridgeSubjectUseCase: GetGradesOfCambridgeSubjectUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetGradesOfCambridgeSubjectRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getGradesOfCambridgeSubjectUseCase.execute({
      classNewId: req.params.classNewId,
      subjectNewId: req.params.subjectNewId,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.TEACHER,
      userId: req.user._id,
    });

    return new SuccessResponse<GetGradesOfCambridgeSubjectResponse>("global.success", result);
  }
}
