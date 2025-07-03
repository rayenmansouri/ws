import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateIBGradesOfGroupUseCase } from "../../../../../feature/examGrade/useCases/ib/UpdateIBGradesOfGroup.usecase";
import { TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  UpdateIBGradesOfGroupRouteConfig,
  UpdateIBGradesOfGroupResponse,
} from "./updateIBGradesOfGroup.types";

@Controller()
export class UpdateIBGradesOfGroupController extends BaseController<UpdateIBGradesOfGroupRouteConfig> {
  constructor(
    @inject("UpdateIBGradesOfGroupUseCase")
    private updateIBGradesOfGroupUseCase: UpdateIBGradesOfGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateIBGradesOfGroupRouteConfig>): Promise<void | APIResponse> {
    await this.updateIBGradesOfGroupUseCase.execute({
      groupNewId: req.params.groupNewId,
      termNewId: req.body.termNewId,
      grades: req.body.grades,
      observations: req.body.observations,
      investments: req.body.investments,
      userType: req.userType as TUserTypeEnum,
      userId: req.user._id,
    });

    return new SuccessResponse<UpdateIBGradesOfGroupResponse>("global.success");
  }
}
