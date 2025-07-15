import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { AddGradeReportTemplateUseCase } from "../../../../../feature/gradeReportTemplate/useCases/AddGradeReportTemplate.usecase";
import {
  AddGradeReportTemplateRouteConfig,
  AddGradeReportTemplateResponse,
} from "./addGradeReportTemplate.types";

@Controller()
export class AddGradeReportTemplateController extends BaseController<AddGradeReportTemplateRouteConfig> {
  constructor(
    @inject("AddGradeReportTemplateUseCase")
    private addGradeReportTemplateUseCase: AddGradeReportTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<AddGradeReportTemplateRouteConfig>): Promise<void | APIResponse> {
    await this.addGradeReportTemplateUseCase.execute(req.body);

    return new SuccessResponse<AddGradeReportTemplateResponse>(
      "gradeReportTemplate.addedSuccessfully",
    );
  }
}
