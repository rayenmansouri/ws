import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetFinanceDashboardParams,
  GetFinanceDashboardUseCase,
} from "../../../../../feature/finance/useCases/GetFinanceDashboard.usecase";
import {
  GetFinanceDashboardRouteConfig,
  GetFinanceDashboardResponse,
} from "./getFinanceDashboard.types";

@Controller()
export class GetFinanceDashboardController extends BaseController<GetFinanceDashboardRouteConfig> {
  constructor(
    @inject("GetFinanceDashboardUseCase")
    private getFinanceDashboardUseCase: GetFinanceDashboardUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetFinanceDashboardRouteConfig>): Promise<void | APIResponse> {
    const dto: GetFinanceDashboardParams = {
      startDate: req.query.startDate,
      endDate: req.query.endDate,
      levelIds: req.query.levels,
    };
    const response = await this.getFinanceDashboardUseCase.execute(dto);
    return new SuccessResponse<GetFinanceDashboardResponse>("global.success", response);
  }
}
