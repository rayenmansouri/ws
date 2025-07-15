import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListSchoolsUseCase } from "../../../../../feature/schools/useCases/ListSchools.usecase";
import { ListSchoolsResponse, ListSchoolsRouteConfig } from "./listSchools.types";

@Controller()
export class ListSchoolsController extends BaseController<ListSchoolsRouteConfig> {
  constructor(@inject("ListSchoolsUseCase") private listSchoolsUseCase: ListSchoolsUseCase) {
    super();
  }

  async main(req: TypedRequest<ListSchoolsRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listSchoolsUseCase.execute(
      {
        search: req.query.search,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListSchoolsResponse>("global.listSuccessfullyRetrieved", response);
  }
}
