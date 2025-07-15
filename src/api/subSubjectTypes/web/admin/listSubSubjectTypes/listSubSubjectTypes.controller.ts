import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListSubSubjectTypeUseCase } from "../../../../../feature/subSubjectTypes/usecases/ListSubSubjectType.usecase";
import {
  ListSubSubjectTypesRouteConfig,
  ListSubSubjectTypesResponse,
} from "./listSubSubjectTypes.types";

@Controller()
export class ListSubSubjectTypesController extends BaseController<ListSubSubjectTypesRouteConfig> {
  constructor(
    @inject("ListSubSubjectTypeUseCase")
    private listSubSubjectTypeUseCase: ListSubSubjectTypeUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListSubSubjectTypesRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listSubSubjectTypeUseCase.execute(req.query.search, {
      page: req.query.page,
      limit: req.query.limit,
    });
    return new SuccessResponse<ListSubSubjectTypesResponse>("global.success", response);
  }
}
