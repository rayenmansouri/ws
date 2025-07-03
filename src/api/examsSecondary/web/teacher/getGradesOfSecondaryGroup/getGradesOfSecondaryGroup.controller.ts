import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGradesOfSecondaryGroupUseCase } from "../../../../../feature/examGrade/useCases/secondary/GetGradesOfSecondaryGroup.usecase";
import {
  GetGradesOfSecondaryGroupRouteConfig,
  GetGradesOfSecondaryGroupResponse,
} from "./getGradesOfSecondaryGroup.types";

@Controller()
export class GetGradesOfSecondaryGroupController extends BaseController<GetGradesOfSecondaryGroupRouteConfig> {
  constructor(
    @inject("GetGradesOfSecondaryGroupUseCase")
    private getGradesOfSecondaryGroupUseCase: GetGradesOfSecondaryGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGradesOfSecondaryGroupRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getGradesOfSecondaryGroupUseCase.execute({
      groupNewId: req.params.groupNewId,
      termNewId: req.query.termNewId,
      userType: END_USER_ENUM.TEACHER,
      userId: req.user._id,
    });

    return new SuccessResponse<GetGradesOfSecondaryGroupResponse>("global.success", result);
  }
}
