import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetPrimaryStudentGradeReportUseCase } from "../../../../../feature/examGrade/useCases/primary/GetPrimaryStudentGradeReport.usecase";
import {
  GetPrimaryChildGradeReportPDFRouteConfig,
  GetPrimaryChildGradeReportPDFResponse,
} from "./getPrimaryChildGradeReportPDF.types";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";

@Controller()
export class GetPrimaryChildGradeReportPDFController extends BaseController<GetPrimaryChildGradeReportPDFRouteConfig> {
  constructor(
    @inject("GetPrimaryStudentGradeReportUseCase")
    private getPrimaryStudentGradeReportUseCase: GetPrimaryStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetPrimaryChildGradeReportPDFRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.getPrimaryStudentGradeReportUseCase.execute({
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
    });

    return new SuccessResponse<GetPrimaryChildGradeReportPDFResponse>("global.success", response);
  }
}
