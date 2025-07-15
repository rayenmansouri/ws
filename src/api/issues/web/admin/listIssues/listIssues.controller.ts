import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListIssuesOfAdminUseCase } from "../../../../../feature/issues/usecases/listIssuesOfAdmin.usecase";
import { ListIssuesRouteConfig, ListIssuesResponse } from "./listIssues.types";

@Controller()
export class ListIssuesController extends BaseController<ListIssuesRouteConfig> {
  constructor(
    @inject("ListIssuesOfAdminUseCase") private listIssuesOfAdminUseCase: ListIssuesOfAdminUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListIssuesRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listIssuesOfAdminUseCase.execute(
      {
        isSeen: req.query.isSeen,
        issueReasonIds: req.query.issueReasonIds,
        issueStatus: req.query.issueStatus,
        search: req.query.search,
      },
      { page: req.query.page, limit: req.query.limit },
    );

    return new SuccessResponse<ListIssuesResponse>("global.listSuccessfullyRetrieved", response);
  }
}
