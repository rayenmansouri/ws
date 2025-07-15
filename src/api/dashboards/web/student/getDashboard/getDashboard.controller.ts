import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetStudentDashboardUseCase } from "../../../../../feature/dashboards/useCases/GetStudentDashboard.usecase";
import { GetDashboardRouteConfig, GetDashboardResponse } from "./getDashboard.types";

@Controller()
export class GetDashboardController extends BaseController<GetDashboardRouteConfig> {
  constructor(
    @inject("GetStudentDashboardUseCase")
    private getStudentDashboardUseCase: GetStudentDashboardUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetDashboardRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getStudentDashboardUseCase.execute({
      studentNewId: req.user.newId,
    });

    return new SuccessResponse<GetDashboardResponse>("global.success", response);
  }
}
