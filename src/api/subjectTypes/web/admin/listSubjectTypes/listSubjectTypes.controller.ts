import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListSubjectTypesResponse, ListSubjectTypesRouteConfig } from "./listSubjectTypes.types";
import { inject } from "../../../../../core/container/TypedContainer";
import { SubjectTypeRepo } from "../../../../../feature/subjectTypes/domains/SubjectType.repo";

@Controller()
export class ListSubjectTypesController extends BaseController<ListSubjectTypesRouteConfig> {
  constructor(@inject("SubjectTypeRepo") private subjectTypeRepo: SubjectTypeRepo) {
    super();
  }
  async main(req: TypedRequest<ListSubjectTypesRouteConfig>): Promise<void | APIResponse> {
    const response = await this.subjectTypeRepo.listSubjectTypes(
      {
        search: req.query.search,
      },
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );
    return new SuccessResponse<ListSubjectTypesResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
