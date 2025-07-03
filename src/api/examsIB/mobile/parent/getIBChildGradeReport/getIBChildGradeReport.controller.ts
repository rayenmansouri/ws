import { inject } from "../../../../../core/container/TypedContainer";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetIBChildGradeReportUseCase } from "../../../../../feature/examGrade/useCases/ib/GetIBChildGradeReport.usecase";
import { Parent } from "../../../../../feature/parents/domain/parent.entity";
import {
  GetIBChildGradeReportRouteConfig,
  GetIBChildGradeReportResponse,
} from "./getIBChildGradeReport.types";

@Controller()
export class GetIBChildGradeReportController extends BaseController<GetIBChildGradeReportRouteConfig> {
  constructor(
    @inject("GetIBChildGradeReportUseCase")
    private getIBChildGradeReportUseCase: GetIBChildGradeReportUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<GetIBChildGradeReportRouteConfig>): Promise<void | APIResponse> {
    const response = await this.getIBChildGradeReportUseCase.execute({
      parent: req.user as unknown as Parent,
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
    });

    return new SuccessResponse<GetIBChildGradeReportResponse>("global.success", response);
  }
}
