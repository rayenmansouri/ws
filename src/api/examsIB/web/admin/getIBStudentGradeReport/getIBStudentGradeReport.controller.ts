import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBStudentGradeReportUseCase } from "../../../../../feature/examGrade/useCases/ib/GetIBStudentGradeReport.usecase";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  GetIBStudentGradeReportResponse,
  GetIBStudentGradeReportRouteConfig,
} from "./getIBStudentGradeReport.types";

@Controller()
export class GetIBStudentGradeReportController extends BaseController<GetIBStudentGradeReportRouteConfig> {
  constructor(
    @inject("GetIBStudentGradeReportUseCase")
    private getIBStudentGradeReportUseCase: GetIBStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetIBStudentGradeReportRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getIBStudentGradeReportUseCase.execute({
      studentNewId: req.params.studentNewId,
      termNewId: req.query.termNewId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
      schoolYearId: req.query.schoolYearId,
    });

    return new SuccessResponse<GetIBStudentGradeReportResponse>("global.success", response);
  }
}
