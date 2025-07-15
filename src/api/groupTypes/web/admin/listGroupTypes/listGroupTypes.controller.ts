import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListGroupTypesUseCase } from "../../../../../feature/groupType/useCases/ListGroupTypes.usecase";
import { ListGroupTypesResponse, ListGroupTypesRouteConfig } from "./listGroupTypes.types";

@Controller()
export class ListGroupTypesController extends BaseController<ListGroupTypesRouteConfig> {
  constructor(
    @inject("ListGroupTypesUseCase") private listGroupTypesUseCase: ListGroupTypesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListGroupTypesRouteConfig>): Promise<APIResponse> {
    const response = await this.listGroupTypesUseCase.execute(req.query);

    return new SuccessResponse<ListGroupTypesResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
