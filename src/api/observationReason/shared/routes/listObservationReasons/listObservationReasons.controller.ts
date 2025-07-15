import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListObservationReasonsUseCase } from "../../../../../feature/observationsReason/usecases/ListObservationReasons.usecase";

import {
  ListObservationReasonsResponse,
  ListObservationReasonsRouteConfig,
} from "./listObservationReasons.types";

@Controller()
export class ListObservationReasonsController extends BaseController<ListObservationReasonsRouteConfig> {
  constructor(
    @inject("ListObservationReasonsUseCase")
    private listObservationReasonsUseCase: ListObservationReasonsUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListObservationReasonsRouteConfig>): Promise<APIResponse> {
    const response = await this.listObservationReasonsUseCase.execute({
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit,
    });
    return new SuccessResponse<ListObservationReasonsResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
