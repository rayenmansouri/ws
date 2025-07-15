import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGradesOfIBSubjectUseCase } from "../../../../../feature/examGrade/useCases/ib/GetGradesOfIBSubject.usecase";
import {
  GetGradesOfIBSubjectRouteConfig,
  GetGradesOfIBSubjectResponse,
} from "./getGradesOfIBSubject.types";

@Controller()
export class GetGradesOfIBSubjectController extends BaseController<GetGradesOfIBSubjectRouteConfig> {
  constructor(
    @inject("GetGradesOfIBSubjectUseCase")
    private readonly getGradesOfIBSubjectUseCase: GetGradesOfIBSubjectUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGradesOfIBSubjectRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getGradesOfIBSubjectUseCase.execute({
      classNewId: req.params.classNewId,
      subjectNewId: req.params.subjectNewId,
      termNewId: req.query.termNewId,
      userId: req.user._id,
      userType: req.userType as TEndUserEnum,
    });

    return new SuccessResponse<GetGradesOfIBSubjectResponse>("global.success", response);
  }
}
