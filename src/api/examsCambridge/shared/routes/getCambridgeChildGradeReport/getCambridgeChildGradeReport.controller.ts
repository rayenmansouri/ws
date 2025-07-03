import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetCambridgeChildGradeReportRouteConfig,
  GetCambridgeChildGradeReportResponse,
} from "./getCambridgeChildGradeReport.types";
import { GetCambridgeChildGradeReportUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetCambridgeChildGradeReport.usecase";
import { inject } from "../../../../../core/container/TypedContainer";
import { Parent } from "../../../../../feature/parents/domain/parent.entity";

@Controller()
export class GetCambridgeChildGradeReportController extends BaseController<GetCambridgeChildGradeReportRouteConfig> {
  constructor(
    @inject("GetCambridgeChildGradeReportUseCase")
    private getCambridgeChildGradeReportUseCase: GetCambridgeChildGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetCambridgeChildGradeReportRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getCambridgeChildGradeReportUseCase.execute({
      parent: req.user as unknown as Parent,
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
    });

    return new SuccessResponse<GetCambridgeChildGradeReportResponse>("global.success", result);
  }
}
