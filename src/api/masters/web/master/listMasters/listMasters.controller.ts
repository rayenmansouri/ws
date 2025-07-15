import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListMastersUseCase } from "../../../../../feature/masters/useCases/ListMasters.usecase";
import { ListMastersRouteConfig, ListMastersResponse } from "./listMasters.types";

@Controller()
export class ListMastersController extends BaseController<ListMastersRouteConfig> {
  constructor(@inject("ListMastersUseCase") private listMastersUseCase: ListMastersUseCase) {
    super();
  }

  async main(req: TypedRequest<ListMastersRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listMastersUseCase.execute(
      {
        search: req.query.search,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );
    return new SuccessResponse<ListMastersResponse>("global.listSuccessfullyRetrieved", response);
  }
}
