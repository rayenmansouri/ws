import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetPrimaryStudentGradeReportUseCase,
  getPrimaryStudentGradeReport,
} from "../../../../../feature/examGrade/useCases/primary/GetPrimaryStudentGradeReport.usecase";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  GetStudentGradeReportPrimaryResponse,
  GetStudentGradeReportPrimaryRouteConfig,
} from "./getStudentGradeReportPrimary.types";

@Controller()
export class GetStudentGradeReportPrimaryController extends BaseController<GetStudentGradeReportPrimaryRouteConfig> {
  constructor(
    @inject("GetPrimaryStudentGradeReportUseCase")
    private getPrimaryStudentGradeReportUseCase: GetPrimaryStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetStudentGradeReportPrimaryRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: getPrimaryStudentGradeReport = {
      studentNewId: req.params.studentNewId,
      termNewId: req.query.termNewId,
      templateIds: req.query.templateIds,
      schoolYearId: req.query.schoolYearId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
    };

    const response = await this.getPrimaryStudentGradeReportUseCase.execute(dto);
    return new SuccessResponse<GetStudentGradeReportPrimaryResponse>("global.success", response);
  }
}
