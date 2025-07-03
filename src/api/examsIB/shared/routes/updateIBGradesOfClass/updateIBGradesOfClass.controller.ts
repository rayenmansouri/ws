import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateIBGradesOfClassUseCase } from "../../../../../feature/examGrade/useCases/ib/UpdateIBGradesOfClass.usecase";
import { TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  UpdateIBGradesOfClassRouteConfig,
  UpdateIBGradesOfClassResponse,
} from "./updateIBGradesOfClass.types";

@Controller()
export class UpdateIBGradesOfClassController extends BaseController<UpdateIBGradesOfClassRouteConfig> {
  constructor(
    @inject("UpdateIBGradesOfClassUseCase")
    private updateIBGradesOfClassUseCase: UpdateIBGradesOfClassUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateIBGradesOfClassRouteConfig>): Promise<void | APIResponse> {
    await this.updateIBGradesOfClassUseCase.execute({
      classNewId: req.params.classNewId,
      subjectNewId: req.params.subjectNewId,
      termNewId: req.body.termNewId,
      grades: req.body.grades,
      observations: req.body.observations,
      investments: req.body.investments,
      userType: req.userType as TUserTypeEnum,
      userId: req.userId,
    });

    return new SuccessResponse<UpdateIBGradesOfClassResponse>("global.success");
  }
}
