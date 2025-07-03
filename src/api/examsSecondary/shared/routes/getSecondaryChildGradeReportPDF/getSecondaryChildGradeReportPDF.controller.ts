import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetSecondaryStudentGradeReportUseCase } from "../../../../../feature/examGrade/useCases/secondary/GetSecondaryStudentGradeReport.usecase";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  GetSecondaryChildGradeReportPDFRouteConfig,
  GetSecondaryChildGradeReportPDFResponse,
} from "./getSecondaryChildGradeReportPDF.types";

@Controller()
export class GetSecondaryChildGradeReportPDFController extends BaseController<GetSecondaryChildGradeReportPDFRouteConfig> {
  constructor(
    @inject("GetSecondaryStudentGradeReportUseCase")
    private getSecondaryStudentGradeReportUseCase: GetSecondaryStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetSecondaryChildGradeReportPDFRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getSecondaryStudentGradeReportUseCase.execute({
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
    });
    
    return new SuccessResponse<GetSecondaryChildGradeReportPDFResponse>("global.success", response);
  }
}
