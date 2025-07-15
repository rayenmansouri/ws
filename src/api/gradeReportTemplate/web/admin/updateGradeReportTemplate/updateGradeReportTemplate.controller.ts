import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { UpdateGradeReportTemplateUseCase } from "../../../../../feature/gradeReportTemplate/useCases/UpdateGradeReportTemplate.usecase";
import {
  UpdateGradeReportTemplateResponse,
  UpdateGradeReportTemplateRouteConfig,
} from "./updateGradeReportTemplate.types";

@Controller()
export class UpdateGradeReportTemplateController extends BaseController<UpdateGradeReportTemplateRouteConfig> {
  constructor(
    @inject("UpdateGradeReportTemplateUseCase")
    private updateGradeReportTemplateUseCase: UpdateGradeReportTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<UpdateGradeReportTemplateRouteConfig>): Promise<void | APIResponse> {
    await this.updateGradeReportTemplateUseCase.execute(req.params.templateNewId, req.body);
    return new SuccessResponse<UpdateGradeReportTemplateResponse>("global.success");
  }
}
