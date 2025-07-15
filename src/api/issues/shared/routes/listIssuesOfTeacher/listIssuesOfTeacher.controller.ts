import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListIssuesOfTeacherUseCase } from "../../../../../feature/issues/usecases/listIssuesOfTeacher.usecase";
import {
  ListIssuesOfTeacherRouteConfig,
  ListIssuesOfTeacherResponse,
} from "./listIssuesOfTeacher.types";

@Controller()
export class ListIssuesOfTeacherController extends BaseController<ListIssuesOfTeacherRouteConfig> {
  constructor(
    @inject("ListIssuesOfTeacherUseCase")
    private listIssuesOfTeacherUseCase: ListIssuesOfTeacherUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListIssuesOfTeacherRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listIssuesOfTeacherUseCase.execute(
      req.user._id,
      {
        isSeen: req.query.isSeen,
        issueReasonIds: req.query.issueReasonIds,
        issueStatus: req.query.issueStatus,
        search: req.query.search,
      },
      {
        limit: req.query.limit,
        page: req.query.page,
      },
    );

    return new SuccessResponse<ListIssuesOfTeacherResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
