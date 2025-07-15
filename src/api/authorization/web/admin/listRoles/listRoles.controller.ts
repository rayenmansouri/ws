import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListRolesUseCase } from "../../../../../feature/authorization/useCases/ListRoles.usecase";
import { ListRolesRouteConfig, ListRolesResponse } from "./listRoles.types";

@Controller()
export class ListRolesController extends BaseController<ListRolesRouteConfig> {
  constructor(@inject("ListRolesUseCase") private listRolesUseCase: ListRolesUseCase) {
    super();
  }

  async main(req: TypedRequest<ListRolesRouteConfig>): Promise<void | APIResponse> {
    const userType = req.query.userType;

    const res = await this.listRolesUseCase.execute(
      {
        search: req.query.search,
        userTypes: userType ? [userType] : undefined,
        language: req.language,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListRolesResponse>("global.listSuccessfullyRetrieved", {
      meta: res.meta,
      docs: res.docs.map(role => ({
        _id: role._id,
        newId: role.newId,
        name: role.translation[req.language],
      })),
    });
  }
}
