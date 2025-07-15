import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSecondaryGradeReportStatsUseCase } from "../../../../../feature/examGrade/useCases/secondary/GetSecondaryGradeReportStats.usecase";
import {
  GetSecondaryGradeReportStatsRouteConfig,
  GetSecondaryGradeReportStatsResponse,
} from "./getSecondaryGradeReportStats.types";

@Controller()
export class GetSecondaryGradeReportStatsController extends BaseController<GetSecondaryGradeReportStatsRouteConfig> {
  constructor(
    @inject("GetSecondaryGradeReportStatsUseCase")
    private getSecondaryGradeReportStatsUseCase: GetSecondaryGradeReportStatsUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetSecondaryGradeReportStatsRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getSecondaryGradeReportStatsUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetSecondaryGradeReportStatsResponse>("global.success", result);
  }
}
