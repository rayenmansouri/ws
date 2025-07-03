import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListSchoolYearUseCase } from "../../../../../feature/schoolYears/useCases/ListSchoolYear.usecase";
import { ListSchoolYearRouteConfig, ListSchoolYearResponse } from "./listSchoolYear.types";

@Controller()
export class ListSchoolYearController extends BaseController<ListSchoolYearRouteConfig> {
  constructor(
    @inject("ListSchoolYearUseCase") private listSchoolYearUseCase: ListSchoolYearUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListSchoolYearRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listSchoolYearUseCase.execute({
      search: req.query.search,
      options: {
        limit: req.query.limit,
        page: req.query.page,
      },
    });
    return new SuccessResponse<ListSchoolYearResponse>("global.success", response);
  }
}
