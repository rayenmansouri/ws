import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetLevelsOverviewUseCase } from "../../../../../feature/levels/useCases/GetLevelsOverview.usecase";
import { GetLevelsOverviewRouteConfig, GetLevelsOverviewResponse } from "./getLevelsOverview.types";

@Controller()
export class GetLevelsOverviewController extends BaseController<GetLevelsOverviewRouteConfig> {
  constructor(
    @inject("GetLevelsOverviewUseCase") private getLevelsOverviewUseCase: GetLevelsOverviewUseCase,
  ) {
    super();
  }

  async main(_: TypedRequest<GetLevelsOverviewRouteConfig>): Promise<void | APIResponse> {
    const levelOverview = await this.getLevelsOverviewUseCase.execute();
    return new SuccessResponse<GetLevelsOverviewResponse>("global.success", levelOverview);
  }
}
