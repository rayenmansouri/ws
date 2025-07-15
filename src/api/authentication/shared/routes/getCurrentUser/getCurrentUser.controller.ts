import { Controller } from "../../../../../core/container/decorators/Controller.decorator";
import { inject } from "../../../../../core/container/TypedContainer";
import { BaseController } from "../../../../../core/express/controllers/BaseController";
import { TypedRequest } from "../../../../../core/express/types";
import { APIResponse } from "../../../../../core/responseAPI/APIResponse";
import { SuccessResponse } from "../../../../../core/responseAPI/APISuccessResponse";
import { schoolDocStore } from "../../../../../core/subdomainStore";
import { IssueRepo } from "../../../../../feature/issues/domain/Issue.repo";
import { ConversationRepo } from "../../../../../feature/messages/domain/Conversation.repo";
import { NotificationRepo } from "../../../../../feature/notifications/Notification.repo";
import { Parent } from "../../../../../feature/parents/domain/parent.entity";
import { StudentRepo } from "../../../../../feature/students/domain/Student.repo";
import { UserMapper } from "../../../../../feature/users/mappers/User.mapper";
import { GetCurrentUserRouteConfig, GetCurrentUserResponse } from "./getCurrentUser.types";
import { UserPostFeedRepo } from "../../../../../feature/announcements/repos/UserPostFeed.repo";

@Controller()
export class GetCurrentUserController extends BaseController<GetCurrentUserRouteConfig> {
  constructor(
    @inject("NotificationRepo") private notificationRepo: NotificationRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("ConversationRepo") private conversationRepo: ConversationRepo,
    @inject("UserPostFeedRepo") private userPostFeedRepo: UserPostFeedRepo,
  ) {
    super();
  }

  async main(req: TypedRequest<GetCurrentUserRouteConfig>): Promise<void | APIResponse> {
    const [
      unseenNotificationsNumber,
      unseenConversationsNumber,
      unseenParentDemands,
      unseenAnnouncementsNumber,
    ] = await Promise.all([
      this.notificationRepo.getUnseenNotificationsNumberOfUser(req.user._id),
      this.conversationRepo.getUnseenConversationNumberForUser(req.user._id),
      this.issueRepo.getUnseenIssuesNumberForParent(req.user._id),
      this.userPostFeedRepo.getUnseenPostsNumberForUser(req.user._id),
    ]);

    const school = schoolDocStore[req.tenantId];

    const currentUserDTO = UserMapper.toCurrentUserDTO({
      user: req.user,
      school,
      unseenNotification: unseenNotificationsNumber,
      unseenConversations: unseenConversationsNumber,
      unseenAnnouncements: unseenAnnouncementsNumber,
      unseenParentDemands,
      language: req.language,
    });

    const parent = req.user as unknown as Parent;
    const students = await this.studentRepo.findManyByIds(parent.students, { populate: ["level"] });

    const response = {
      ...currentUserDTO,
      students: students.map(student => ({
        _id: student._id,
        newId: student.newId,
        fullName: student.fullName,
        avatar: student.avatar.link,
        level: student.level.name,
        instanceType: school.instanceType,
        examGradeSystem: student.level.examGradeSystem,
      })),
    };

    return new SuccessResponse<GetCurrentUserResponse>("global.success", response);
  }
}
