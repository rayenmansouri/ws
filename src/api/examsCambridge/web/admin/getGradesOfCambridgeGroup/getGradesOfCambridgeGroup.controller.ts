import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGradesOfCambridgeGroupUsecase } from "../../../../../feature/examGrade/useCases/cambridge/GetGradesOfCambridgeGroup.usecase";
import {
  GetGradesOfCambridgeGroupRouteConfig,
  GetGradesOfCambridgeGroupResponse,
} from "./getGradesOfCambridgeGroup.types";

@Controller()
export class GetGradesOfCambridgeGroupController extends BaseController<GetGradesOfCambridgeGroupRouteConfig> {
  constructor(
    @inject("GetGradesOfCambridgeGroupUsecase")
    private getGradesOfCambridgeGroupUsecase: GetGradesOfCambridgeGroupUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGradesOfCambridgeGroupRouteConfig>): Promise<void | APIResponse> {
    const res = await this.getGradesOfCambridgeGroupUsecase.execute({
      groupNewId: req.params.groupNewId,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.ADMIN,
      userId: req.user._id,
    });

    return new SuccessResponse<GetGradesOfCambridgeGroupResponse>("global.success", res);
  }
}
