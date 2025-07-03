import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBStudentGradeReportUseCase } from "../../../../../feature/examGrade/useCases/ib/GetIBStudentGradeReport.usecase";
import { BaseUser, TUserTypeEnum } from "../../../../../feature/users/domain/baseUser.entity";
import {
  GetIBChildGradeReportPDFResponse,
  GetIBChildGradeReportPDFRouteConfig,
} from "./getIBChildGradeReportPDF.types";

@Controller()
export class GetIBChildGradeReportPDFController extends BaseController<GetIBChildGradeReportPDFRouteConfig> {
  constructor(
    @inject("GetIBStudentGradeReportUseCase")
    private getIBStudentGradeReportUseCase: GetIBStudentGradeReportUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetIBChildGradeReportPDFRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getIBStudentGradeReportUseCase.execute({
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
      userType: req.userType as TUserTypeEnum,
      user: req.user as unknown as BaseUser,
    });

    return new SuccessResponse<GetIBChildGradeReportPDFResponse>("global.success", response);
  }
}
