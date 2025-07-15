import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ListInteractionsOfIssueUseCase } from "../../../../../feature/issues/usecases/listInteractionsOfIssue.usecase";
import { ID } from "../../../../../types/BaseEntity";
import { PickFromEnum } from "../../../../../types/utils/enums.util";
import {
  ListInteractionsOfIssueRouteConfig,
  ListInteractionsOfIssueResponse,
} from "./listInteractionsOfIssue.types";

@Controller()
export class ListInteractionsOfIssueController extends BaseController<ListInteractionsOfIssueRouteConfig> {
  constructor(
    @inject("ListInteractionsOfIssueUseCase")
    private listInteractionsOfIssueUseCase: ListInteractionsOfIssueUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListInteractionsOfIssueRouteConfig>): Promise<void | APIResponse> {
    const userDetails = {
      userId: req.userId as ID,
      userType: req.userType as PickFromEnum<TEndUserEnum, "teacher" | "parent" | "admin">,
    };

    const response = await this.listInteractionsOfIssueUseCase.execute(
      req.params.issueNewId,
      userDetails,
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListInteractionsOfIssueResponse>(
      "global.listSuccessfullyRetrieved",
      response,
    );
  }
}
