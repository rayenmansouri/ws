import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListUsersForAlertUseCase,
  ListUsersForAlertRequestDto,
} from "./../../../../../feature/alertManagement/useCases/listUsersForAlert.usecase";
import { ListUsersForAlertResponse, ListUsersForAlertRouteConfig } from "./listUsersForAlert.types";

@Controller()
export class ListUsersForAlertController extends BaseController<ListUsersForAlertRouteConfig> {
  constructor(
    @inject("ListUsersForAlertUseCase")
    private readonly listUsersForAlertUseCase: ListUsersForAlertUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListUsersForAlertRouteConfig>): Promise<void | APIResponse> {
    const dto: ListUsersForAlertRequestDto = {
      fullName: req.query.search,
      userTypes: req.query.userTypes || [],
      classes: req.query.classes || [],
      classTypes: req.query.classTypes || [],
      levels: req.query.levels || [],
      page: req.query.page,
      limit: req.query.limit,
      groupTypeIds: req.query.groups || [],
    };

    const res = await this.listUsersForAlertUseCase.execute(dto);

    return new SuccessResponse<ListUsersForAlertResponse>("global.success", res);
  }
}
