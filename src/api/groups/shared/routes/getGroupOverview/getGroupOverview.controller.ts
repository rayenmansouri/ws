import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetGroupOverviewRouteConfig, GetGroupOverviewResponse } from "./getGroupOverview.types";
import { GetGroupOverviewUseCase } from "../../../../../feature/groupManagement/useCases/GroupOverview.usecase";
import { TEndUserEnum } from "../../../../../constants/globalEnums";

@Controller()
export class GetGroupOverviewController extends BaseController<GetGroupOverviewRouteConfig> {
  constructor(
    @inject("GetGroupOverviewUseCase")
    private getGroupOverviewUseCase: GetGroupOverviewUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetGroupOverviewRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getGroupOverviewUseCase.execute({
      groupNewId: req.params.groupNewId,
      userId: req.user._id,
      userType: req.userType as TEndUserEnum,
    });

    return new SuccessResponse<GetGroupOverviewResponse>("global.success", result);
  }
}
