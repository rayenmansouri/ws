import { ListConversationAttachmentsUseCase } from "./../../../../../feature/messages/useCases/ListConversationAttachments.usecase";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import {
  ListConversationAttachmentsRouteConfig,
  ListConversationAttachmentsResponse,
} from "./listConversationAttachments.types";
import { inject } from "../../../../../core/container/TypedContainer";

@Controller()
export class ListConversationAttachmentsController extends BaseController<ListConversationAttachmentsRouteConfig> {
  constructor(
    @inject("ListConversationAttachmentsUseCase")
    private listConversationAttachmentsUseCase: ListConversationAttachmentsUseCase,
  ) {
    super();
  }

  async main(
    req: TypedRequest<ListConversationAttachmentsRouteConfig>,
  ): Promise<void | APIResponse> {
    const { conversationNewId } = req.params;

    const response = await this.listConversationAttachmentsUseCase.execute(
      conversationNewId,
      req.user._id,
      {
        page: req.query.page,
        limit: req.query.limit,
      },
    );

    return new SuccessResponse<ListConversationAttachmentsResponse>("global.success", response);
  }
}
