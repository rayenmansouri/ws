import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetClassDashboardUseCase } from "../../../../../feature/classes/useCases/GetClassDashboard.usecase";
import { GetClassDashboardRouteConfig, GetClassDashboardResponse } from "./getClassDashboard.types";

@Controller()
export class GetClassDashboardController extends BaseController<GetClassDashboardRouteConfig> {
  constructor(
    @inject("GetClassDashboardUseCase")
    private getClassDashboardUseCase: GetClassDashboardUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetClassDashboardRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getClassDashboardUseCase.execute({
      classNewId: req.params.classNewId,
      language: req.language,
      dateInterval: {
        from: req.query.dateInterval.from,
        to: req.query.dateInterval.to,
      },
      tabName: req.query.tabName || "attendance",
    });
    return new SuccessResponse<GetClassDashboardResponse>("global.success", response);
  }
}
