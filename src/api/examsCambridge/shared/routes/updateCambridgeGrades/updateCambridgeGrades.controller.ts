import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateCambridgeGradesUseCase } from "../../../../../feature/examGrade/useCases/cambridge/UpdateCambridgeGrades.usecase";
import { TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  UpdateCambridgeGradesResponse,
  UpdateCambridgeGradesRouteConfig,
} from "./updateCambridgeGrades.types";

@Controller()
export class UpdateCambridgeGradesController extends BaseController<UpdateCambridgeGradesRouteConfig> {
  constructor(
    @inject("UpdateCambridgeGradesUseCase")
    private updateCambridgeGradesUseCase: UpdateCambridgeGradesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateCambridgeGradesRouteConfig>): Promise<void | APIResponse> {
    await this.updateCambridgeGradesUseCase.execute({
      classNewId: req.params.classNewId,
      termNewId: req.body.termNewId,
      subjectNewId: req.params.subjectNewId,
      grades: req.body.grades,
      observations: req.body.observations,
      userType: req.userType as TUserTypeEnum,
      userId: req.user._id,
    });

    return new SuccessResponse<UpdateCambridgeGradesResponse>("global.success");
  }
}
