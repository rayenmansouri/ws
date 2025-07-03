import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdatePrimaryGradesUseCase } from "../../../../../feature/examGrade/useCases/primary/UpdatePrimaryGrades.usecase";
import { TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  UpdatePrimaryGradesResponse,
  UpdatePrimaryGradesRouteConfig,
} from "./updatePrimaryGrades.types";

@Controller()
export class UpdatePrimaryGradesController extends BaseController<UpdatePrimaryGradesRouteConfig> {
  constructor(
    @inject("UpdatePrimaryGradesUseCase")
    private updatePrimaryGradesUseCase: UpdatePrimaryGradesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdatePrimaryGradesRouteConfig>): Promise<void | APIResponse> {
    await this.updatePrimaryGradesUseCase.execute({
      classNewId: req.params.classNewId,
      termNewId: req.body.termNewId,
      fieldIndex: +req.params.fieldIndex,
      grades: req.body.grades,
      observations: req.body.observations,
      userType: req.userType as TUserTypeEnum,
      userId: req.user._id,
    });

    return new SuccessResponse<UpdatePrimaryGradesResponse>("global.success");
  }
}
