import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGradesOfSecondarySubjectUseCase } from "../../../../../feature/examGrade/useCases/secondary/GetGradesOfSecondarySubject.usecase";
import {
  GetGradesOfSecondarySubjectRouteConfig,
  GetGradesOfSecondarySubjectResponse,
} from "./getGradesOfSecondarySubject.types";

@Controller()
export class GetGradesOfSecondarySubjectController extends BaseController<GetGradesOfSecondarySubjectRouteConfig> {
  constructor(
    @inject("GetGradesOfSecondarySubjectUseCase")
    private getGradesOfSecondarySubjectUseCase: GetGradesOfSecondarySubjectUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetGradesOfSecondarySubjectRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getGradesOfSecondarySubjectUseCase.execute({
      classNewId: req.params.classNewId,
      subjectNewId: req.params.subjectNewId,
      subSubjectNewId: req.query.subSubjectNewId,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.TEACHER,
      userId: req.user._id,
    });

    return new SuccessResponse<GetGradesOfSecondarySubjectResponse>("global.success", result);
  }
}
