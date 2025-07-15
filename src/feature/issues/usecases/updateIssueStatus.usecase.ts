import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { StudentApplicationService } from "../../students/application/Student.application.service";
import { StudentRepo } from "../../students/domain/Student.repo";
import { InteractionRepo } from "../domain/Interaction.repo";
import { IssueRepo } from "../domain/Issue.repo";
import { END_USER_ENUM } from "./../../../constants/globalEnums";
import { BadRequestError } from "./../../../core/ApplicationErrors";
import { Populate } from "./../../../core/populateTypes";
import { ID } from "./../../../types/BaseEntity";
import { AdminApplicationService } from "./../../admins/application/admin.application.service";
import { Class } from "./../../classes/domain/class.entity";
import { InteractionMetaData } from "./../domain/interaction.entity";
import { TIssuesStatusEnum } from "./../domain/issue.entity";
import { IssueDTO } from "./../dtos/issue.dto";
import { IssueActionEvent } from "./../events/issueAction.event";
import { IssueMapper } from "./../mappers/Issue.mapper";

export type updateIssueStatusRequestDto = {
  issueNewId: string;
  status: TIssuesStatusEnum;
  adminId: ID;
  tenantId: ID;
};

@injectable()
export class UpdateIssueStatusUseCase {
  constructor(
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("StudentApplicationService") private studentAppService: StudentApplicationService,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("InteractionRepo") private interactionRepo: InteractionRepo,
    @inject("AdminApplicationService") private adminAppService: AdminApplicationService,
  ) {}

  async execute(dto: updateIssueStatusRequestDto): Promise<void> {
    const issue = await this.issueRepo.findOneByNewIdOrThrow(dto.issueNewId, "notFound.issue", {
      populate: ["author", "studentProfile", "teacher", "reason"],
    });

    if (issue.status === dto.status)
      throw new BadRequestError("issue.newStatusMustBeDifferentThanOldStatus");

    const newParticipantViewStatuses = issue.participantViewStatuses.map(participantViewStatus => {
      if (participantViewStatus.participantType === END_USER_ENUM.ADMIN) {
        return { ...participantViewStatus, isSeen: true };
      }
      return { ...participantViewStatus, isSeen: false };
    });

    const isAdminAlreadyParticipant = issue.adminParticipants.includes(dto.adminId);

    const updatedAdminParticipants = isAdminAlreadyParticipant
      ? issue.adminParticipants
      : [...issue.adminParticipants, dto.adminId];

    await this.issueRepo.updateOneById(issue._id, {
      status: dto.status,
      adminParticipants: updatedAdminParticipants,
      participantViewStatuses: newParticipantViewStatuses,
    });

    issue.status = dto.status;
    issue.adminParticipants = updatedAdminParticipants;
    issue.participantViewStatuses = newParticipantViewStatuses;

    const student = await this.studentRepo.findOneByIdOrThrow(
      issue.studentProfile.student,
      "notFound.student",
    );

    const { studentProfile } = await this.studentAppService.getCurrentAcademicDetails(student);

    let classDoc: Class | null = null;
    if (studentProfile.class)
      classDoc = await this.classRepo.findOneByIdOrThrow(studentProfile.class, "notFound.class");

    let lastInteraction: Populate<InteractionMetaData, "actor" | "sender" | "target"> | null = null;

    if (issue.lastInteraction)
      lastInteraction = await this.interactionRepo.findOneById(issue.lastInteraction, {
        populate: ["sender", "actor", "target"],
      });

    const issueDto: IssueDTO = IssueMapper.toIssueDTO({
      issue,
      student,
      classDoc,
      lastInteraction,
      userType: "admin",
    });

    const adminIds = await this.adminAppService.getAdminIdsByActionAndResource("VIEW", "ISSUE");

    const filteredAdminParticipants = adminIds.filter(id => id !== dto.adminId);

    const event = new IssueActionEvent(dto.tenantId, issueDto);

    event.sendEventToAdminsAndTeacher({
      adminIds: filteredAdminParticipants,
      teacherId: issue.teacher?._id ?? null,
    });

    event.sendEventToParent(issue.author._id);
  }
}
