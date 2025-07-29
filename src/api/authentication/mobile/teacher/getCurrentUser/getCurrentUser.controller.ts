import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { ConversationRepo } from "../../../../../feature/messages/domain/Conversation.repo";
import { NotificationRepo } from "../../../../../feature/notifications/Notification.repo";
import { SessionRepo } from "../../../../../feature/sessionManagement/domain/Session.repo";
import { SessionMapper } from "../../../../../feature/sessionManagement/mapper/Session.mapper";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { GetCurrentUserResponse, GetCurrentUserRouteConfig } from "./getCurrentUser.types";

@Controller()
export class GetCurrentUserController extends BaseController<GetCurrentUserRouteConfig> {
  constructor(
    @inject("NotificationRepo") private notificationRepo: NotificationRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
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

    const currentUserDTO = UserMapper.toCurrentUserDTO({
      user: req.user,
      school,
      unseenNotification: unseenNotificationsNumber,
      unseenConversations: unseenConversationsNumber,
      language: req.language,
    });

    const nextSession = await this.sessionRepo.findNextSession(
      { teacherId: req.user._id },
      req.tenantId,
    );
    const nextSessionDTO = nextSession
      ? SessionMapper.toSessionDTO({ ...nextSession, attendance: null })
      : null;

    return new SuccessResponse<GetCurrentUserResponse>("global.success", {
      ...currentUserDTO,
      nextSession: nextSessionDTO,
    });
  }
}
