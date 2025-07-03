import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetSecondaryChildGradeReportUseCase,
  getSecondaryChildGradeRequestDto,
} from "../../../../../feature/examGrade/useCases/secondary/GetSecondaryChildGradeReport.usecase";
import { Parent } from "../../../../../feature/parents/domain/parent.entity";
import {
  GetSecondaryChildGradeReportResponse,
  GetSecondaryChildGradeReportRouteConfig,
} from "./getSecondaryChildGradeReport.types";

@Controller()
export class GetSecondaryChildGradeReportController extends BaseController<GetSecondaryChildGradeReportRouteConfig> {
  constructor(
    @inject("GetSecondaryChildGradeReportUseCase")
    private getSecondaryChildGradeReportUseCase: GetSecondaryChildGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetSecondaryChildGradeReportRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: getSecondaryChildGradeRequestDto = {
      parent: req.user as unknown as Parent,
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
    };
    const result = await this.getSecondaryChildGradeReportUseCase.execute(dto);

    return new SuccessResponse<GetSecondaryChildGradeReportResponse>("global.success", result);
  }
}
