import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateCambridgeGradesOfGroupUseCase } from "../../../../../feature/examGrade/useCases/cambridge/UpdateCambridgeGradesOfGroup.usecase";
import { TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  UpdateCambridgeGradesOfGroupResponse,
  UpdateCambridgeGradesOfGroupRouteConfig,
} from "./updateCambridgeGradesOfGroup.types";

@Controller()
export class UpdateCambridgeGradesOfGroupController extends BaseController<UpdateCambridgeGradesOfGroupRouteConfig> {
  constructor(
    @inject("UpdateCambridgeGradesOfGroupUseCase")
    private updateCambridgeGradesOfGroupUseCase: UpdateCambridgeGradesOfGroupUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateCambridgeGradesOfGroupRouteConfig>,
  ): Promise<void | APIResponse> {
    await this.updateCambridgeGradesOfGroupUseCase.execute({
      groupNewId: req.params.groupNewId,
      termNewId: req.body.termNewId,
      grades: req.body.grades,
      observations: req.body.observations,
      userType: req.userType as TUserTypeEnum,
      userId: req.user._id,
    });

    return new SuccessResponse<UpdateCambridgeGradesOfGroupResponse>("global.success");
  }
}
