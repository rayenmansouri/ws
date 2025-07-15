import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetTeacherPaymentDashboardRouteConfig,
  GetTeacherPaymentDashboardResponse,
} from "./getTeacherPaymentDashboard.types";
import {
  GetTeacherPaymentDashboardUseCase,
  getTeacherPaymentDashboardRequestDto,
} from "../../../../../feature/teacherPayment/usecases/getTeacherPaymentDashboard.usecase";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class GetTeacherPaymentDashboardController extends BaseController<GetTeacherPaymentDashboardRouteConfig> {
  constructor(
    @inject("GetTeacherPaymentDashboardUseCase")
    private readonly getTeacherPaymentDashboardUseCase: GetTeacherPaymentDashboardUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetTeacherPaymentDashboardRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: getTeacherPaymentDashboardRequestDto = {
      year: req.query.year,
      month: req.query.month,
      teacherNewId: req.params.teacherNewId,
    };
    const dashboardData = await this.getTeacherPaymentDashboardUseCase.execute(dto);

    return new SuccessResponse<GetTeacherPaymentDashboardResponse>("global.success", dashboardData);
  }
}
