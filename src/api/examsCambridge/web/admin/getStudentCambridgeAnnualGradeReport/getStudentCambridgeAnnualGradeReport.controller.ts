import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetStudentCambridgeAnnualGradeReportRouteConfig,
  GetStudentCambridgeAnnualGradeReportResponse,
} from "./getStudentCambridgeAnnualGradeReport.types";
import { GetStudentCambridgeAnnualGradeReportUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetStudentCambridgeAnnualGradeReport.usecase";

@Controller()
export class GetStudentCambridgeAnnualGradeReportController extends BaseController<GetStudentCambridgeAnnualGradeReportRouteConfig> {
  constructor(
    @inject("GetStudentCambridgeAnnualGradeReportUseCase")
    private getStudentCambridgeAnnualGradeReportUseCase: GetStudentCambridgeAnnualGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetStudentCambridgeAnnualGradeReportRouteConfig>,
  ): Promise<void | APIResponse> {
    const annualGradeReport = await this.getStudentCambridgeAnnualGradeReportUseCase.execute(
      req.params.classNewId,
      req.params.studentNewId,
    );

    return new SuccessResponse<GetStudentCambridgeAnnualGradeReportResponse>(
      "global.success",
      annualGradeReport,
    );
  }
}
