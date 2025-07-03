import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSecondaryGradesUseCase } from "../../../../../feature/examGrade/useCases/secondary/UpdateSecondaryGrades.usecase";
import { TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  UpdateSecondaryGradesResponse,
  UpdateSecondaryGradesRouteConfig,
} from "./updateSecondaryGrades.types";

@Controller()
export class UpdateSecondaryGradesController extends BaseController<UpdateSecondaryGradesRouteConfig> {
  constructor(
    @inject("UpdateSecondaryGradesUseCase")
    private updateSecondaryGradesUseCase: UpdateSecondaryGradesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateSecondaryGradesRouteConfig>): Promise<void | APIResponse> {
    await this.updateSecondaryGradesUseCase.execute({
      classNewId: req.params.classNewId,
      termNewId: req.body.termNewId,
      subjectNewId: req.params.subjectNewId,
      subSubjectNewId: req.body.subSubjectNewId,
      grades: req.body.grades,
      observations: req.body.observations,
      userType: req.userType as TUserTypeEnum,
      userId: req.user._id,
    });

    return new SuccessResponse<UpdateSecondaryGradesResponse>("global.success");
  }
}
