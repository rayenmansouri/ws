import { INTERACTION_TYPE_ENUM, ISSUE_ACTION_ENUM } from "./../dtos/interaction.dto";
import { IssueMetaData } from "./../domain/issue.entity";
import { Populate } from "./../../../core/populateTypes";
import { AdminApplicationService } from "./../../admins/application/admin.application.service";
import { IssueActionEvent } from "./../events/issueAction.event";
import { BaseUser } from "./../../users/domain/baseUser.entity";
import { IssueDTO } from "./../dtos/issue.dto";
import { Student } from "./../../students/domain/student.entity";
import { Class } from "./../../classes/domain/class.entity";
import { IssueMapper } from "./../mappers/Issue.mapper";
import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InteractionRepo } from "../domain/Interaction.repo";
import { IssueRepo } from "../domain/Issue.repo";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { BadRequestError } from "./../../../core/ApplicationErrors";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import { IssueService } from "./../domain/Issue.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { ClassRepo } from "../../classes/domain/Class.repo";

export type unassignTeacherFromIssueRequestDto = {
  issueNewId: string;
  admin: BaseUser;
  tenantId: string;
};

type TPopulatedIssue = Populate<IssueMetaData, "author" | "teacher" | "studentProfile" | "reason">;

@injectable()
export class UnAssignTeacherFromIssueUseCase {
  constructor(
    @inject("IssueRepo") private readonly issueRepo: IssueRepo,
    @inject("InteractionRepo") private readonly interactionRepo: InteractionRepo,
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
    @inject("ClassRepo") private readonly classRepo: ClassRepo,
    @inject("AdminApplicationService") private readonly adminAppService: AdminApplicationService,
  ) {}

  async execute(dto: unassignTeacherFromIssueRequestDto): Promise<void> {
    const issue: TPopulatedIssue = await this.issueRepo.findOneByNewIdOrThrow(
      dto.issueNewId,
      "notFound.issue",
      {
        populate: ["author", "teacher", "studentProfile", "reason"],
      },
    );
    if (issue.status === "resolved") throw new BadRequestError("issue.alreadyResolved");

    if (!issue.teacher) throw new BadRequestError("issue.noTeacherAssigned");

    if (!issue.isForwarded) {
      await this.updateUnForwardedIssue(issue, dto.admin._id);
      return;
    }

    const action = await this.interactionRepo.addOne({
      issue: issue._id,
      sentAt: getCurrentTimeOfSchool(dto.tenantId),
      interactionType: INTERACTION_TYPE_ENUM.ACTION,
      actor: dto.admin._id,
      actorType: END_USER_ENUM.ADMIN,
      action: ISSUE_ACTION_ENUM.REMOVE,
      targetType: END_USER_ENUM.TEACHER,
      target: issue.teacher._id,
      content: null,
      senderType: null,
      sender: null,
    });

    const student: Student = await this.studentRepo.findOneByIdOrThrow(
      issue.studentProfile.student,
      "notFound.student",
    );

    let classDoc: Class | null = null;
    if (issue.studentProfile.class)
      classDoc = await this.classRepo.findOneByIdOrThrow(
        issue.studentProfile.class,
        "notFound.class",
      );

    const issueDto: IssueDTO = IssueMapper.toIssueDTO({
      issue,
      student,
      classDoc,
      userType: "admin",
      lastInteraction: { ...action, target: issue.teacher, sender: null, actor: dto.admin },
    });

    const event = new IssueActionEvent(dto.tenantId, issueDto);
    const adminIds = await this.adminAppService.getAdminIdsByActionAndResource("VIEW", "ISSUE");

    event.sendEventToAdminsAndTeacher({
      adminIds,
      teacherId: issue.teacher._id,
    });
    event.sendEventToParent(issue.author._id);

    await this.updateUnForwardedIssue(issue, dto.admin._id);
  }

  private async updateUnForwardedIssue(issue: TPopulatedIssue, adminId: ID): Promise<void> {
    const newParticipants: ID[] = Array.from(new Set([...issue.adminParticipants, adminId]));

    const newParticipantViewStatus = IssueService.updateParticipantViewStatuses(
      issue.participantViewStatuses,
      "admin",
    );

    await this.issueRepo.updateOneById(issue._id, {
      teacher: null,
      isForwarded: false,
      participantViewStatuses: newParticipantViewStatus,
      adminParticipants: newParticipants,
    });
  }
}
