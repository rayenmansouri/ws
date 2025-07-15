import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetCambridgeStudentGradeReportUseCase } from "../../../../../feature/examGrade/useCases/cambridge/GetCambridgeStudentGradeReport.usecase";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  GetCambridgeChildGradeReportPDFRouteConfig,
  GetCambridgeChildGradeReportPDFResponse,
} from "./getCambridgeChildGradeReportPDF.types";

@Controller()
export class GetCambridgeChildGradeReportPDFController extends BaseController<GetCambridgeChildGradeReportPDFRouteConfig> {
  constructor(
    @inject("GetCambridgeStudentGradeReportUseCase")
    private getCambridgeStudentGradeReportUseCase: GetCambridgeStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetCambridgeChildGradeReportPDFRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getCambridgeStudentGradeReportUseCase.execute({
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
    });

    return new SuccessResponse<GetCambridgeChildGradeReportPDFResponse>("global.success", response);
  }
}
