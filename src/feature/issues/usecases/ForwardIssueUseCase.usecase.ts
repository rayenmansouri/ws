import { INTERACTION_TYPE_ENUM, ISSUE_ACTION_ENUM } from "./../dtos/interaction.dto";
import { IssueActionEvent } from "./../events/issueAction.event";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { InteractionRepo } from "../domain/Interaction.repo";
import { IssueRepo } from "../domain/Issue.repo";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { BadRequestError } from "./../../../core/ApplicationErrors";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { AdminApplicationService } from "./../../admins/application/admin.application.service";
import { Admin } from "./../../admins/domain/admin.entity";
import { Class } from "./../../classes/domain/class.entity";
import { IssueMapper } from "./../mappers/Issue.mapper";

export type forwardIssueUseCaseRequestDto = {
  issueNewId: string;
  tenantId: string;
  admin: Admin;
};

@injectable()
export class ForwardIssueUseCaseUseCase {
  constructor(
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("InteractionRepo") private interactionRepo: InteractionRepo,
    @inject("AdminApplicationService") private adminAppService: AdminApplicationService,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
  ) {}

  async execute(dto: forwardIssueUseCaseRequestDto): Promise<void> {
    const issue = await this.issueRepo.findOneByNewIdOrThrow(dto.issueNewId, "notFound.issue", {
      populate: ["teacher", "author", "reason", "studentProfile"],
    });

    if (issue.status === "resolved") throw new BadRequestError("issue.alreadyResolved");
    if (!issue.teacher) throw new BadRequestError("issue.noTeacherAssigned");
    if (issue.isForwarded) throw new BadRequestError("issue.alreadyForwarded");

    const currentDate: Date = getCurrentTimeOfSchool(dto.tenantId);
    const action = await this.interactionRepo.addOne({
      issue: issue._id,
      sentAt: currentDate,
      interactionType: INTERACTION_TYPE_ENUM.ACTION,
      actor: dto.admin._id,
      actorType: END_USER_ENUM.ADMIN,
      action: ISSUE_ACTION_ENUM.ADD,
      targetType: END_USER_ENUM.TEACHER,
      target: issue.teacher._id,
      content: null,
      senderType: null,
      sender: null,
    });

    const newAdminParticipants = Array.from(new Set([...issue.adminParticipants, dto.admin._id]));

    await this.issueRepo.updateOneById(issue._id, {
      isForwarded: true,
      lastInteraction: action._id,
      lastInteractionDate: currentDate,
      adminParticipants: newAdminParticipants,
    });
    const student = await this.studentRepo.findOneByIdOrThrow(
      issue.studentProfile.student,
      "notFound.student",
    );

    let classDoc: Class | null = null;
    if (issue.studentProfile.class)
      classDoc = await this.classRepo.findOneByIdOrThrow(
        issue.studentProfile.class,
        "notFound.class",
      );

    const issueDto = IssueMapper.toIssueDTO({
      issue,
      classDoc,
      student,
      userType: "admin",
      lastInteraction: { ...action, target: issue.teacher, sender: null, actor: dto.admin },
    });

    const adminIds = await this.adminAppService.getAdminIdsByActionAndResource("VIEW", "ISSUE");
    const filteredAdminIds = adminIds.filter(id => id !== dto.admin._id);

    const event = new IssueActionEvent(dto.tenantId, issueDto);

    event.sendEventToAdminsAndTeacher({
      adminIds: filteredAdminIds,
      teacherId: issue.teacher._id,
    });

    event.sendEventToParent(issue.author._id);
  }
}
