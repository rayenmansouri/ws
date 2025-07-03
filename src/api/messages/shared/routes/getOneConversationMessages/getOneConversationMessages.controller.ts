import { inject } from "../../../../../core/container/TypedContainer";
import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { ConversationRepo } from "../../../../../feature/messages/domain/Conversation.repo";
import {
  GetOneConversationMessagesResponse,
  GetOneConversationMessagesRouteConfig,
} from "./getOneConversationMessages.types";

@Controller()
export class GetOneConversationMessagesController extends BaseController<GetOneConversationMessagesRouteConfig> {
  constructor(@inject("ConversationRepo") private readonly conversationRepo: ConversationRepo) {
    super();
  }

  async main(
    req: TypedRequest<GetOneConversationMessagesRouteConfig>,
  ): Promise<void | APIResponse> {
    const participantIds = [...req.body.participants, req.user._id];
    const conversation = await this.conversationRepo.findConversationByParticipantIds(
      participantIds,
    );
    if (!conversation) {
      return new SuccessResponse<GetOneConversationMessagesResponse>("global.success", {
        conversationNewId: null,
      });
    }

    return new SuccessResponse<GetOneConversationMessagesResponse>("global.success", {
      conversationNewId: conversation.newId,
    });
  }
}
