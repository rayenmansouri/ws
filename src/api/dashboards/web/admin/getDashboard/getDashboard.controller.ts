import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetDashboardRouteConfig, GetDashboardResponse } from "./getDashboard.types";
import { inject } from "../../../../../core/container/TypedContainer";
import {
  GetAdminDashboardUseCase,
  GetAdminDashboardRequest,
} from "../../../../../feature/dashboards/useCases/getAdminDashboard.usecase";

@Controller()
export class GetDashboardController extends BaseController<GetDashboardRouteConfig> {
  constructor(
    @inject("GetAdminDashboardUseCase") private getDashboardUseCase: GetAdminDashboardUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetDashboardRouteConfig>): Promise<void | APIResponse> {
    const dto: GetAdminDashboardRequest = {
      levels: req.query.levels,
      dateInterval: req.query.dateInterval,
      search: req.query.search,
      tabName: req.query.tabName,
      page: req.query.page ?? 1,
      limit: req.query.limit ?? 10,
      language: req.language,
    };

    const res = await this.getDashboardUseCase.execute(dto);
    return new SuccessResponse<GetDashboardResponse>("global.success", res);
  }
}
