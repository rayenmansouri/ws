import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListUnenrolledStudentsForGroupUseCase } from "../../../../../feature/groupManagement/useCases/ListUnenrolledStudentsForGroup.usecase";
import {
  ListUnenrolledStudentsForGroupRouteConfig,
  ListUnenrolledStudentsForGroupResponse,
} from "./listUnenrolledStudentsForGroup.types";

@Controller()
export class ListUnenrolledStudentsForGroupController extends BaseController<ListUnenrolledStudentsForGroupRouteConfig> {
  constructor(
    @inject("ListUnenrolledStudentsForGroupUseCase")
    private listUnenrolledStudentsForGroupUseCase: ListUnenrolledStudentsForGroupUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ListUnenrolledStudentsForGroupRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.listUnenrolledStudentsForGroupUseCase.execute({
      groupNewId: req.query.groupNewId,
      search: req.query.search,
      page: req.query.page,
      limit: req.query.limit,
    });
    return new SuccessResponse<ListUnenrolledStudentsForGroupResponse>("global.success", response);
  }
}
