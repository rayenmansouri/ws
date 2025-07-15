import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListSessionTypeUseCase } from "../../../../../feature/sessionTypes/usecases/ListSessionType.usecase";
import { ListSessionTypeRouteConfig, ListSessionTypeResponse } from "./listSessionType.types";

@Controller()
export class ListSessionTypeController extends BaseController<ListSessionTypeRouteConfig> {
  constructor(
    @inject("ListSessionTypeUseCase") private listSessionTypeUseCase: ListSessionTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListSessionTypeRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listSessionTypeUseCase.execute({
      ...req.query,
      name: req.query.search,
    });
    return new SuccessResponse<ListSessionTypeResponse>("global.success", response);
  }
}
