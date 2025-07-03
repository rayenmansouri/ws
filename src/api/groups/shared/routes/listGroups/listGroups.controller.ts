import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListTeacherGroupUseCase } from "../../../../../feature/groupManagement/useCases/ListTeacherGroup.usecase";
import { Teacher } from "../../../../../feature/teachers/domain/teacher.entity";
import { ListGroupsRouteConfig, ListGroupsResponse } from "./listGroups.types";

@Controller()
export class ListGroupsController extends BaseController<ListGroupsRouteConfig> {
  constructor(
    @inject("ListTeacherGroupUseCase")
    private listTeacherGroupUseCase: ListTeacherGroupUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListGroupsRouteConfig>): Promise<void | APIResponse> {
    const { limit, page } = req.query;
    const response = await this.listTeacherGroupUseCase.execute(req.user as unknown as Teacher, {
      limit,
      page,
    });
    return new SuccessResponse<ListGroupsResponse>("global.success", response);
  }
}
