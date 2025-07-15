import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetPrimaryGradeReportStatsUseCase } from "../../../../../feature/examGrade/useCases/primary/GetPrimaryGradeReportStats.usecase";
import {
  GetPrimaryGradeReportStatsRouteConfig,
  GetPrimaryGradeReportStatsResponse,
} from "./getPrimaryGradeReportStats.types";

@Controller()
export class GetPrimaryGradeReportStatsController extends BaseController<GetPrimaryGradeReportStatsRouteConfig> {
  constructor(
    @inject("GetPrimaryGradeReportStatsUseCase")
    private getPrimaryGradeReportStatsUseCase: GetPrimaryGradeReportStatsUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetPrimaryGradeReportStatsRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getPrimaryGradeReportStatsUseCase.execute(
      req.params.classNewId,
      req.query.termNewId,
    );

    return new SuccessResponse<GetPrimaryGradeReportStatsResponse>("global.success", result);
  }
}
