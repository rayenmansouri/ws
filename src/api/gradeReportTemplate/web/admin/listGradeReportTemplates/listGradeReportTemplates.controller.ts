import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ID } from "../../../../../types/BaseEntity";
import { ListGradeReportTemplateUseCase } from "../../../../../feature/gradeReportTemplate/useCases/ListGradeReportTemplate.usecase";
import {
  ListGradeReportTemplatesRouteConfig,
  ListGradeReportTemplatesResponse,
} from "./listGradeReportTemplates.types";

@Controller()
export class ListGradeReportTemplatesController extends BaseController<ListGradeReportTemplatesRouteConfig> {
  constructor(
    @inject("ListGradeReportTemplateUseCase")
    private listGradeReportTemplateUseCase: ListGradeReportTemplateUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListGradeReportTemplatesRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listGradeReportTemplateUseCase.execute(
      {
        search: req.query.search,
        classTypeId: req.query.classTypeId as ID | undefined,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListGradeReportTemplatesResponse>("global.success", response);
  }
}
