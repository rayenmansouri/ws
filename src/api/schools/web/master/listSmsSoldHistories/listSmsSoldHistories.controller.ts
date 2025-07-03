import { ListSmsSoldHistoriesUseCase } from "./../../../../../feature/alertManagement/useCases/listSmsSoldHistories.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListSmsSoldHistoriesRouteConfig,
  ListSmsSoldHistoriesResponse,
} from "./listSmsSoldHistories.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ListSmsSoldHistoriesController extends BaseController<ListSmsSoldHistoriesRouteConfig> {
  constructor(
    @inject("ListSmsSoldHistoriesUseCase")
    private readonly listSoldHistoriesUseCase: ListSmsSoldHistoriesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListSmsSoldHistoriesRouteConfig>): Promise<void | APIResponse> {
    const result = await this.listSoldHistoriesUseCase.execute(
      req.params.tenantId,
      req.query.page,
      req.query.limit,
    );
    return new SuccessResponse<ListSmsSoldHistoriesResponse>("global.success", result);
  }
}
