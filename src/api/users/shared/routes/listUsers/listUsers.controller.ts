import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListUsersUseCase } from "../../../../../feature/users/useCases/ListUsers.usecase";
import { ListUsersRouteConfig, ListUsersResponse } from "./listUsers.types";

@Controller()
export class ListUsersController extends BaseController<ListUsersRouteConfig> {
  constructor(@inject("ListUsersUseCase") private listUsersUseCase: ListUsersUseCase) {
    super();
  }

  async main(req: TypedRequest<ListUsersRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listUsersUseCase.execute({
      limit: req.query.limit,
      page: req.query.page,
    });
    return new SuccessResponse<ListUsersResponse>("global.success", response);
  }
}
