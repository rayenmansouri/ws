import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListIssuesOfParentUseCase } from "../../../../../feature/issues/usecases/listIssuesOfParent.usecase";
import {
  ListIssuesOfParentRouteConfig,
  ListIssuesOfParentResponse,
} from "./listIssuesOfParent.types";

@Controller()
export class ListIssuesOfParentController extends BaseController<ListIssuesOfParentRouteConfig> {
  constructor(
    @inject("ListIssuesOfParentUseCase")
    private listIssuesOfParentUseCase: ListIssuesOfParentUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListIssuesOfParentRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listIssuesOfParentUseCase.execute(
      req.user._id,
      {
        isSeen: req.query.isSeen,
        issueReasonIds: req.query.issueReasonIds,
        issueStatus: req.query.issueStatus,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListIssuesOfParentResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
