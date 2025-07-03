import { getSecondaryStudentGradeReport } from "./../../../../../feature/examGrade/useCases/secondary/GetSecondaryStudentGradeReport.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSecondaryStudentGradeReportUseCase } from "../../../../../feature/examGrade/useCases/secondary/GetSecondaryStudentGradeReport.usecase";
import {
  GetStudentGradeReportSecondaryRouteConfig,
  GetStudentGradeReportSecondaryResponse,
} from "./getStudentGradeReportSecondary.types";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";

@Controller()
export class GetStudentGradeReportSecondaryController extends BaseController<GetStudentGradeReportSecondaryRouteConfig> {
  constructor(
    @inject("GetSecondaryStudentGradeReportUseCase")
    private getSecondaryStudentGradeReportUseCase: GetSecondaryStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetStudentGradeReportSecondaryRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: getSecondaryStudentGradeReport = {
      studentNewId: req.params.studentNewId,
      termNewId: req.query.termNewId,
      schoolYearId: req.query.schoolYearId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
    };
    const response = await this.getSecondaryStudentGradeReportUseCase.execute(dto);
    return new SuccessResponse<GetStudentGradeReportSecondaryResponse>("global.success", response);
  }
}
