import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetParentDashboardUseCase } from "../../../../../feature/dashboards/useCases/GetParentDashboard.usecase";
import { GetDashboardResponse, GetDashboardRouteConfig } from "./getDashboard.types";

@Controller()
export class GetDashboardController extends BaseController<GetDashboardRouteConfig> {
  constructor(
    @inject("GetParentDashboardUseCase")
    private getParentDashboardUseCase: GetParentDashboardUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetDashboardRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getParentDashboardUseCase.execute({
      parentNewId: req.user.newId,
      studentNewId: req.query.studentNewId,
    });

    return new SuccessResponse<GetDashboardResponse>("global.success", response);
  }
}
