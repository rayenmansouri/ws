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
import { StudentApplicationService } from "../../../../../feature/students/application/Student.application.service";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { Student } from "./../../../../../feature/students/domain/student.entity";
import { GetCurrentUserResponse, GetCurrentUserRouteConfig } from "./getCurrentUser.types";

@Controller()
export class GetCurrentUserController extends BaseController<GetCurrentUserRouteConfig> {
  constructor(
    @inject("NotificationRepo") private notificationRepo: NotificationRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
    @inject("StudentApplicationService")
    private studentApplicationService: StudentApplicationService,
  ) {
    super();
  }

  async main(req: TypedRequest<GetCurrentUserRouteConfig>): Promise<void | APIResponse> {
    const [unseenNotificationsNumber, unseenConversationsNumber] = await Promise.all([
      this.notificationRepo.getUnseenNotificationsNumberOfUser(req.user._id),
      this.conversationRepo.getUnseenConversationNumberForUser(req.user._id),
    ]);

    const school = schoolDocStore[req.tenantId];

    const currentUserDTO = UserMapper.toCurrentUserDTO({
      user: req.user,
      school,
      unseenNotification: unseenNotificationsNumber,
      unseenConversations: unseenConversationsNumber,
      language: req.language,
    });

    const { classId, groupIds } = await this.studentApplicationService.getCurrentAcademicDetails(
      req.user as unknown as Student,
    );
    const nextSession = await this.sessionRepo.findNextSession(
      { classId: classId || undefined, groupIds: groupIds },
      req.tenantId,
    );
    const sessionDTO = nextSession
      ? SessionMapper.toSessionDTO({ ...nextSession, attendance: null })
      : null;

    return new SuccessResponse<GetCurrentUserResponse>("global.success", {
      ...currentUserDTO,
      nextSession: sessionDTO,
    });
  }
}
