import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { InteractionRepo } from "../domain/Interaction.repo";
import { IssueRepo } from "../domain/Issue.repo";
import { TEndUserEnum } from "./../../../constants/globalEnums";
import { BadRequestError } from "./../../../core/ApplicationErrors";
import {
  FileDetails,
  FileManager,
  FileUploadPayload,
} from "./../../../core/fileManager/FileManager";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import { PickFromEnum } from "./../../../types/utils/enums.util";
import { AdminApplicationService } from "./../../admins/application/admin.application.service";
import { BaseUser } from "./../../users/domain/baseUser.entity";
import { Issue } from "./../domain/issue.entity";
import { IssueService } from "./../domain/Issue.service";
import { INTERACTION_TYPE_ENUM } from "./../dtos/interaction.dto";
import { ReplySentEvent, TSendReplyEventPayload } from "./../events/replySent.event";
import { InteractionMapper } from "./../mappers/Interaction.mapper";
import { InteractionDTO } from "./../dtos/interaction.dto";

export type sendReplyUseCaseRequestDto = {
  text?: string;
  files: FileUploadPayload[];
  issueNewId: string;
  userType: PickFromEnum<TEndUserEnum, "admin" | "teacher" | "parent">;
  user: BaseUser;
  tenantId: string;
};

@injectable()
export class SendReplyUseCase {
  constructor(
    @inject("IssueRepo") private issueRepo: IssueRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("InteractionRepo") private interactionRepo: InteractionRepo,
    @inject("AdminApplicationService") private adminAppService: AdminApplicationService,
  ) {}

  async execute(dto: sendReplyUseCaseRequestDto): Promise<InteractionDTO> {
    const isTextProvided = dto.text ?? null;
    const isAttachmentProvided = dto.files?.length;

    if (!isTextProvided && !isAttachmentProvided) {
      throw new BadRequestError("issue.attachmentOrTextRequired");
    }

    const issue = await this.issueRepo.findOneByNewIdOrThrow(dto.issueNewId, "notFound.issue");

    if (issue.status === "resolved") throw new BadRequestError("issue.alreadyResolved");

    this.assertUserCanReply(issue, dto);

    const currentDate: Date = getCurrentTimeOfSchool(dto.tenantId);

    const { uploadedMediaFiles, uploadedDocumentsFiles } = await this.uploadFiles(dto);

    const reply = await this.interactionRepo.addOne({
      issue: issue._id,
      sentAt: currentDate,
      interactionType: INTERACTION_TYPE_ENUM.REPLY,
      senderType: dto.userType,
      sender: dto.user._id,
      content: {
        text: dto.text,
        documents: uploadedDocumentsFiles,
        media: uploadedMediaFiles,
      },
      action: null,
      actorType: null,
      target: null,
      targetType: null,
      actor: null,
    });

    const newParticipantViewStatus = IssueService.updateParticipantViewStatuses(
      issue.participantViewStatuses,
      dto.userType,
    );

    let newAdminParticipants = issue.adminParticipants;
    if (dto.userType === "admin") {
      newAdminParticipants = Array.from(new Set([...issue.adminParticipants, dto.user._id]));
    }

    await this.issueRepo.updateOneById(issue._id, {
      participantViewStatuses: newParticipantViewStatus,
      adminParticipants: newAdminParticipants,
      lastInteraction: reply._id,
      lastInteractionDate: currentDate,
    });

    const replyDto = InteractionMapper.toInteractionDTO({
      ...reply,
      sender: dto.user,
      actor: null,
      target: null,
      senderType: dto.userType,
    });

    const eventPayload: TSendReplyEventPayload = {
      issueId: issue._id,
      issueNewId: issue.newId,
      interaction: replyDto,
    };

    await this.sendEvents(dto, issue, eventPayload);

    return replyDto;
  }

  private assertUserCanReply(issue: Issue, dto: sendReplyUseCaseRequestDto): void {
    if (dto.userType === "parent") {
      const isAllowed = dto.user._id !== issue.author;
      if (isAllowed) throw new BadRequestError("issue.youCannotSendReply");
    }

    if (dto.userType === "teacher") {
      const isAllowed = dto.user._id !== issue.teacher;
      if (isAllowed) throw new BadRequestError("issue.youCannotSendReply");
    }
  }

  private async uploadFiles(dto: sendReplyUseCaseRequestDto): Promise<{
    uploadedMediaFiles: FileDetails[];
    uploadedDocumentsFiles: FileDetails[];
  }> {
    const media = dto.files.filter(file => FileManager.isMediaFile(file.mimetype));
    const mediaPaths = FileManager.generateFilePaths(media, dto.tenantId, "issues");

    let uploadedMediaFiles: FileDetails[] = [];
    if (media.length > 0)
      uploadedMediaFiles = await this.fileManager.uploadFiles(media, mediaPaths);

    const documents = dto.files.filter(file => !FileManager.isMediaFile(file.mimetype));
    const documentsPaths = FileManager.generateFilePaths(documents, dto.tenantId, "issues");

    let uploadedDocumentsFiles: FileDetails[] = [];
    if (documents.length > 0)
      uploadedDocumentsFiles = await this.fileManager.uploadFiles(documents, documentsPaths);

    return { uploadedMediaFiles, uploadedDocumentsFiles };
  }

  private async sendEvents(
    dto: sendReplyUseCaseRequestDto,
    issue: Issue,
    eventPayload: TSendReplyEventPayload,
  ): Promise<void> {
    const event = new ReplySentEvent(dto.tenantId, eventPayload);

    const adminIds: ID[] = await this.adminAppService.getAdminIdsByActionAndResource(
      "VIEW",
      "ISSUE",
    );
    const filteredAdminIds = adminIds.filter(adminId => adminId !== dto.user._id);

    event.sendEventToAdminAndTeacher({
      adminIds: filteredAdminIds,
      teacherId: dto.userType === "teacher" ? null : issue.teacher,
    });

    event.sendEventToParent(dto.userType === "parent" ? null : issue.author);
  }
}
