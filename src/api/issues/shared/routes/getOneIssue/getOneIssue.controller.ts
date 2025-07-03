import { TEndUserEnum } from "../../../../../constants/globalEnums";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { GetOneIssueUseCase } from "../../../../../feature/issues/usecases/getOneIssue.usecase";
import { GetOneIssueRouteConfig, GetOneIssueResponse } from "./getOneIssue.types";

@Controller()
export class GetOneIssueController extends BaseController<GetOneIssueRouteConfig> {
  constructor(@inject("GetOneIssueUseCase") private getOneIssueUseCase: GetOneIssueUseCase) {
    super();
  }

  async main(req: TypedRequest<GetOneIssueRouteConfig>): Promise<void | APIResponse> {
    const userDetails = {
      userId: req.user._id,
      userType: req.userType as TEndUserEnum,
    };

    const response = await this.getOneIssueUseCase.execute(req.params.issueNewId, userDetails);

    return new SuccessResponse<GetOneIssueResponse>("global.listSuccessfullyRetrieved", response);
  }
}
