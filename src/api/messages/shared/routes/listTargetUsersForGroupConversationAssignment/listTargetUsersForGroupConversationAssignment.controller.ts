import { TEndUserEnum } from "./../../../../../constants/globalEnums";
import { ListTargetUsersForGroupConversationAssignmentUseCase } from "./../../../../../feature/messages/useCases/ListTargetUsersForGroupConversationAssignment.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListTargetUsersForGroupConversationAssignmentRouteConfig,
  ListTargetUsersForGroupConversationAssignmentResponse,
} from "./listTargetUsersForGroupConversationAssignment.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ListTargetUsersForGroupConversationAssignmentController extends BaseController<ListTargetUsersForGroupConversationAssignmentRouteConfig> {
  constructor(
    @inject("ListTargetUsersForGroupConversationAssignmentUseCase")
    private readonly listTargetUsersForGroupConversationAssignmentUseCase: ListTargetUsersForGroupConversationAssignmentUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ListTargetUsersForGroupConversationAssignmentRouteConfig>,
  ): Promise<void | APIResponse> {
    const response = await this.listTargetUsersForGroupConversationAssignmentUseCase.execute(
      req.params.conversationNewId,
      req.query.fullName,
      req.userType as TEndUserEnum,
    );

    return new SuccessResponse<ListTargetUsersForGroupConversationAssignmentResponse>(
      "global.success",
      response,
    );
  }
}
