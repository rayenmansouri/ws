import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetPrimaryAnnualGradeReportOfStudentUsecase } from "../../../../../feature/examGrade/useCases/primary/GetPrimaryAnnualGradeReportOfStudent.usecase";
import {
  GetPrimaryAnnualGradeReportOfStudentRouteConfig,
  GetPrimaryAnnualGradeReportOfStudentResponse,
} from "./getPrimaryAnnualGradeReportOfStudent.types";

@Controller()
export class GetPrimaryAnnualGradeReportOfStudentController extends BaseController<GetPrimaryAnnualGradeReportOfStudentRouteConfig> {
  constructor(
    @inject("GetPrimaryAnnualGradeReportOfStudentUsecase")
    private getPrimaryAnnualGradeReportOfStudentUsecase: GetPrimaryAnnualGradeReportOfStudentUsecase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetPrimaryAnnualGradeReportOfStudentRouteConfig>,
  ): Promise<void | APIResponse> {
    const result = await this.getPrimaryAnnualGradeReportOfStudentUsecase.execute(
      req.params.classNewId,
      req.params.studentNewId,
    );

    return new SuccessResponse<GetPrimaryAnnualGradeReportOfStudentResponse>(
      "global.success",
      result,
    );
  }
}
