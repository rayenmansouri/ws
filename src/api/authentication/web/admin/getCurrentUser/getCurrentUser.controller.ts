import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { AuthorizationService } from "../../../../../feature/authorization/domain/Authorization.service";
import { IssueRepo } from "../../../../../feature/issues/domain/Issue.repo";
import { ConversationRepo } from "../../../../../feature/messages/domain/Conversation.repo";
import { NotificationRepo } from "../../../../../feature/notifications/Notification.repo";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { GetCurrentUserResponse, GetCurrentUserRouteConfig } from "./getCurrentUser.types";
import { UserPostFeedRepo } from "../../../../../feature/announcements/repos/UserPostFeed.repo";

@Controller()
export class GetCurrentUserController extends BaseController<GetCurrentUserRouteConfig> {
  constructor(
    @inject("NotificationRepo") private notificationRepo: NotificationRepo,
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<GetCurrentUserRouteConfig>): Promise<void | APIResponse> {
    const school = schoolDocStore[req.tenantId];

    const [unseenNotificationsNumber, unseenConversationsNumber, unseenAnnouncementsNumber] =
      await Promise.all([
        this.notificationRepo.getUnseenNotificationsNumberOfUser(req.user._id),
        this.conversationRepo.getUnseenConversationNumberForUser(req.user._id),
        this.userPostFeedRepo.getUnseenPostsNumberForUser(req.user._id),
      ]);

    const isAdminAllowedToSeeParentDemands = AuthorizationService.isActionAllowed(
      req.user,
      "VIEW",
      "ISSUE",
    );

    const unseenParentDemands = isAdminAllowedToSeeParentDemands
      ? await this.issueRepo.getUnseenIssuesNumberForAdmin()
      : null;

    const response = UserMapper.toCurrentUserDTO({
      user: req.user,
      school,
      unseenNotification: unseenNotificationsNumber,
      unseenConversations: unseenConversationsNumber,
      unseenAnnouncements: unseenAnnouncementsNumber,
      language: req.language,
      unseenParentDemands,
    });

    return new SuccessResponse<GetCurrentUserResponse>("global.success", response);
  }
}
