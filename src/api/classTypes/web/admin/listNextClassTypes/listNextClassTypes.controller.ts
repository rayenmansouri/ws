import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListNextClassTypesUseCase } from "../../../../../feature/classTypes/useCases/ListNextClassTypes.usecase";
import {
  ListNextClassTypesRouteConfig,
  ListNextClassTypesResponse,
} from "./listNextClassTypes.types";

@Controller()
export class ListNextClassTypesController extends BaseController<ListNextClassTypesRouteConfig> {
  constructor(
    @inject("ListNextClassTypesUseCase")
    private listNextClassTypesUseCase: ListNextClassTypesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListNextClassTypesRouteConfig>): Promise<void | APIResponse> {
    const { subLevelNewId, search } = req.query;

    const response = await this.listNextClassTypesUseCase.execute(
      { subLevelNewId, search },
      { limit: req.query.limit, page: req.query.page },
    );
    return new SuccessResponse<ListNextClassTypesResponse>("global.success", response);
  }
}
