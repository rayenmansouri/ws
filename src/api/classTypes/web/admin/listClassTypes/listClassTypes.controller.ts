import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListClassTypeUseCase } from "../../../../../feature/classTypes/useCases/ListClassTypes.usecase";
import { ListClassTypesResponse, ListClassTypesRouteConfig } from "./listClassTypes.types";

@Controller()
export class ListClassTypesController extends BaseController<ListClassTypesRouteConfig> {
  constructor(@inject("ListClassTypeUseCase") private listClassTypeUseCase: ListClassTypeUseCase) {
    super();
  }

  async main(req: TypedRequest<ListClassTypesRouteConfig>): Promise<APIResponse> {
    const { levelNewIds, subLevelNewIds, page, limit, sectionNewIds, search } = req.query;
    const response: ListClassTypesResponse = await this.listClassTypeUseCase.execute(
      {
        levelNewIds: levelNewIds || null,
        subLevelNewIds: subLevelNewIds || null,
        sectionNewIds: sectionNewIds || null,
        search: search || null,
      },
      { page, limit },
    );

    return new SuccessResponse<ListClassTypesResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
