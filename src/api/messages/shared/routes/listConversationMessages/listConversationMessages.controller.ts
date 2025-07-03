import { ListConversationMessagesUseCase } from "./../../../../../feature/messages/useCases/ListConversationMessages.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListConversationMessagesRouteConfig,
  ListConversationMessagesResponse,
} from "./listConversationMessages.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ListConversationMessagesController extends BaseController<ListConversationMessagesRouteConfig> {
  constructor(
    @inject("ListConversationMessagesUseCase")
    private listConversationMessagesUseCase: ListConversationMessagesUseCase,
  ) {
    super();
  }

  async main(req: TypedRequest<ListConversationMessagesRouteConfig>): Promise<void | APIResponse> {
    const response = await this.listConversationMessagesUseCase.execute(
      req.params.conversationNewId,
      req.user._id,
      { page: req.query.page, limit: req.query.limit },
    );

    return new SuccessResponse<ListConversationMessagesResponse>("global.success", response);
  }
}
