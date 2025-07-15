import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateSecondaryGradesOfGroupUseCase } from "../../../../../feature/examGrade/useCases/secondary/UpdateSecondaryGradesOfGroup.usecase";
import { TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  UpdateSecondaryGradesOfGroupResponse,
  UpdateSecondaryGradesOfGroupRouteConfig,
} from "./updateSecondaryGradesOfGroup.types";

@Controller()
export class UpdateSecondaryGradesOfGroupController extends BaseController<UpdateSecondaryGradesOfGroupRouteConfig> {
  constructor(
    @inject("UpdateSecondaryGradesOfGroupUseCase")
    private updateSecondaryGradesOfGroupUseCase: UpdateSecondaryGradesOfGroupUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<UpdateSecondaryGradesOfGroupRouteConfig>,
  ): Promise<void | APIResponse> {
    const res = await this.updateSecondaryGradesOfGroupUseCase.execute({
      groupNewId: req.params.groupNewId,
      termNewId: req.body.termNewId,
      grades: req.body.grades,
      observations: req.body.observations,
      userType: req.userType as TUserTypeEnum,
      userId: req.user._id,
    });

    return new SuccessResponse<UpdateSecondaryGradesOfGroupResponse>("global.success", res);
  }
}
