import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { DeleteGradeReportTemplateUseCase } from "../../../../../feature/gradeReportTemplate/useCases/DeleteGradeReportTemplate.usecase";
import {
  DeleteGradeReportTemplateRouteConfig,
  DeleteGradeReportTemplateResponse,
} from "./deleteGradeReportTemplate.types";

@Controller()
export class DeleteGradeReportTemplateController extends BaseController<DeleteGradeReportTemplateRouteConfig> {
  constructor(
    @inject("DeleteGradeReportTemplateUseCase")
    private deleteGradeReportTemplateUseCase: DeleteGradeReportTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<DeleteGradeReportTemplateRouteConfig>): Promise<void | APIResponse> {
    await this.deleteGradeReportTemplateUseCase.execute(req.params.templateNewId);

    return new SuccessResponse<DeleteGradeReportTemplateResponse>("global.success");
  }
}
