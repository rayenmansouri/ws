import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { ConversationRepo } from "../../../../../feature/messages/domain/Conversation.repo";
import { NotificationRepo } from "../../../../../feature/notifications/Notification.repo";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { GetCurrentUserRouteConfig, GetCurrentUserResponse } from "./getCurrentUser.types";

@Controller()
export class GetCurrentUserController extends BaseController<GetCurrentUserRouteConfig> {
  constructor(
    @inject("NotificationRepo") private notificationRepo: NotificationRepo,
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<GetCurrentUserRouteConfig>): Promise<void | APIResponse> {
    const school = schoolDocStore[req.tenantId];

    const [unseenNotificationsNumber, unseenConversationsNumber] = await Promise.all([
      this.notificationRepo.getUnseenNotificationsNumberOfUser(req.user._id),
      this.conversationRepo.getUnseenConversationNumberForUser(req.user._id),
    ]);

    const res = UserMapper.toCurrentUserDTO({
      user: req.user,
      school,
      unseenNotification: unseenNotificationsNumber,
      unseenConversations: unseenConversationsNumber,
      language: req.language,
    });

    return new SuccessResponse<GetCurrentUserResponse>("global.success", res);
  }
}
