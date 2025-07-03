import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGradesOfIBGroupUsecase } from "../../../../../feature/examGrade/useCases/ib/GetGradesOfIBGroup.usecase";
import {
  GetGradesOfIBGroupRouteConfig,
  GetGradesOfIBGroupResponse,
} from "./getGradesOfIBGroup.types";

@Controller()
export class GetGradesOfIBGroupController extends BaseController<GetGradesOfIBGroupRouteConfig> {
  constructor(
    @inject("GetGradesOfIBGroupUseCase")
    private getGradesOfIBGroupUseCase: GetGradesOfIBGroupUsecase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGradesOfIBGroupRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getGradesOfIBGroupUseCase.execute({
      groupNewId: req.params.groupNewId,
      termNewId: req.query.termNewId,
      userId: req.user._id,
      userType: req.userType as TEndUserEnum,
    });

    return new SuccessResponse<GetGradesOfIBGroupResponse>("global.success", response);
  }
}
