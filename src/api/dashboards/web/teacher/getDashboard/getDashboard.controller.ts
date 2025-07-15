import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetTeacherDashboardUseCase } from "../../../../../feature/dashboards/useCases/GetTeacherDashboard.usecase";
import { GetDashboardRouteConfig, GetDashboardResponse } from "./getDashboard.types";

@Controller()
export class GetDashboardController extends BaseController<GetDashboardRouteConfig> {
  constructor(
    @inject("GetTeacherDashboardUseCase")
    private getTeacherDashboardUseCase: GetTeacherDashboardUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetDashboardRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getTeacherDashboardUseCase.execute({
      teacherNewId: req.user.newId,
    });

    return new SuccessResponse<GetDashboardResponse>("global.success", response);
  }
}
