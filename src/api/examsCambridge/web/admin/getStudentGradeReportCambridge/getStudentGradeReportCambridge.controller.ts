import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetStudentGradeReportCambridgeRouteConfig,
  GetStudentGradeReportCambridgeResponse,
} from "./getStudentGradeReportCambridge.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { GetCambridgeStudentGradeReportUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetCambridgeStudentGradeReport.usecase";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";

@Controller()
export class GetStudentGradeReportCambridgeController extends BaseController<GetStudentGradeReportCambridgeRouteConfig> {
  constructor(
    @inject("GetCambridgeStudentGradeReportUseCase")
    private getCambridgeStudentGradeReportUseCase: GetCambridgeStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetStudentGradeReportCambridgeRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getCambridgeStudentGradeReportUseCase.execute({
      studentNewId: req.params.studentNewId,
      termNewId: req.query.termNewId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
      schoolYearId: req.query.schoolYearId,
    });

    return new SuccessResponse<GetStudentGradeReportCambridgeResponse>("global.success", response);
  }
}
