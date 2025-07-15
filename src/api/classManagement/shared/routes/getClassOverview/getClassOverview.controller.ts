import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetClassOverviewUseCase } from "../../../../../feature/classes/useCases/GetClassOverview.usecase";
import { GetClassOverviewRouteConfig, GetClassOverviewResponse } from "./getClassOverview.types";

@Controller()
export class GetClassOverviewController extends BaseController<GetClassOverviewRouteConfig> {
  constructor(
    @inject("GetClassOverviewUseCase") private getClassOverviewUseCase: GetClassOverviewUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetClassOverviewRouteConfig>): Promise<void | APIResponse> {
    const result = await this.getClassOverviewUseCase.execute({
      classNewId: req.params.classNewId,
      userId: req.user._id,
      userType: req.userType as TEndUserEnum,
      language: req.language,
    });

    return new SuccessResponse<GetClassOverviewResponse>("global.success", result);
  }
}
