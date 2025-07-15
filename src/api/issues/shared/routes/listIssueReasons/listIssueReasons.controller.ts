import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { IssueReasonRepo } from "../../../../../feature/issues/domain/IssueReason.repo";
import { ListIssueReasonsRouteConfig, ListIssueReasonsResponse } from "./listIssueReasons.types";

@Controller()
export class ListIssueReasonsController extends BaseController<ListIssueReasonsRouteConfig> {
  constructor(@inject("IssueReasonRepo") private issueReasonRepo: IssueReasonRepo) {
    super();
  }

  async main(req: TypedRequest<ListIssueReasonsRouteConfig>): Promise<APIResponse> {
    const response = await this.issueReasonRepo.listIssueReasons({
      limit: req.query.limit,
      page: req.query.page,
    });

    return new SuccessResponse<ListIssueReasonsResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
