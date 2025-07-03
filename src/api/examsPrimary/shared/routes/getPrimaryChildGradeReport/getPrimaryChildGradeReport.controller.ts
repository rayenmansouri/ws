import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  GetPrimaryChildGradeReportUseCase,
  getPrimaryChildGradeReportRequestDto,
} from "../../../../../feature/examGrade/useCases/primary/GetPrimaryChildGradeReport.usecase";
import { Parent } from "../../../../../feature/parents/domain/parent.entity";
import {
  GetPrimaryChildGradeReportResponse,
  GetPrimaryChildGradeReportRouteConfig,
} from "./getPrimaryChildGradeReport.types";

@Controller()
export class GetPrimaryChildGradeReportController extends BaseController<GetPrimaryChildGradeReportRouteConfig> {
  constructor(
    @inject("GetPrimaryChildGradeReportUseCase")
    private getPrimaryChildGradeReportUseCase: GetPrimaryChildGradeReportUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<GetPrimaryChildGradeReportRouteConfig>,
  ): Promise<void | APIResponse> {
    const dto: getPrimaryChildGradeReportRequestDto = {
      parent: req.user as unknown as Parent,
      studentNewId: req.params.childNewId,
      termNewId: req.query.termNewId,
    };

    const result = await this.getPrimaryChildGradeReportUseCase.execute(dto);

    return new SuccessResponse<GetPrimaryChildGradeReportResponse>("global.success", result);
  }
}
