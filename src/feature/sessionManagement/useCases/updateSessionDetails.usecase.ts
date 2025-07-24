import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { FileDetails, FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { NOTIFICATION_TYPES_ENUM } from "../../../features/notification/constants/constants";
import {
  sendNotificationToStudentsOfClass,
  sendNotificationToStudentsOfClassGroup,
  sendNotificationToStudentsOfGroup,
} from "../../../features/notification/services/helpers.service";
import { ID } from "../../../types/BaseEntity";
import { Role } from "../../authorization/domain/role.entity";
import { School } from "../../schools/domain/school.entity";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { SessionRepo } from "../domain/Session.repo";
import { SessionService } from "../domain/Session.service";
import { SessionDetailsDTO } from "../dtos/sessionDetails.dto";
import { GetSessionDetailsUseCase } from "./getSessionDetails.usecase";

export type UpdateSessionDetailsRequestDTO = {
  sessionNewId: string;
  tenantId: ID;
  notes?: { title: string; text: string }[];
  sessionSummary?: string;
  user: Omit<BaseUser, "roles"> & { roles: Role[] };
  userType: "admin" | "teacher";
  deletedAttachments: string[];
  files: FileUploadPayload[];
};

@injectable()
export class UpdateSessionDetailsUseCase {
  constructor(
    @inject("Connection") private connection: Connection,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("Session") private clientSession: ClientSession,
    @inject("FileManager") private fileManager: FileManager,
    @inject("GetSessionDetailsUseCase") private getSessionDetailsUseCase: GetSessionDetailsUseCase,
    @inject("School") private school: School,
  ) {}

  async execute(dto: UpdateSessionDetailsRequestDTO): Promise<SessionDetailsDTO> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(
      dto.sessionNewId,
      "notFound.session",
      { populate: ["class", "classGroup", "group", "subSubjectType", "subjectType", "teacher"] },
    );

    //TODO need to change this to await this.sessionApplicationService.isUserAllowedToViewSession
    if (dto.userType === "teacher")
      if (
        !SessionService.isSessionBelongingToTeacher(dto.user._id, {
          teacher: session.teacher?._id || null,
        })
      )
        throw new BadRequestError("session.sessionDoesNotBelongsToThisTeacher");

    const formatSessionFiles: FileDetails[] = session.files;
    const newFiles = await this.fileManager.handelEditFile({
      currentFiles: formatSessionFiles,
      filePath: "session",
      filesPathToBeDeleted: dto.deletedAttachments,
      newFiles: dto.files,
    });

    await this.sessionRepo.updateOneById(session._id, {
      notes: dto.notes,
      sessionSummary: dto.sessionSummary,
      files: newFiles,
    });

    const topicName = SessionService.extractTopicName(
      session.subjectType,
      session.subSubjectType,
      session.group,
    );

    if (dto.notes && SessionService.isSessionNotesChanged(session.notes, dto.notes)) {
      if (session.class && !session.classGroup) {
        await sendNotificationToStudentsOfClass(
          this.connection,
          session.class._id,
          {
            topic: NOTIFICATION_TYPES_ENUM.SESSION_NOTES,
            details: { studentNewId: "", sessionNewId: session.newId },
          },
          { $teacherName: session.teacher!.fullName, $topicName: topicName },
          dto.tenantId,
          this.clientSession,
        );
      }

      if (session.classGroup) {
        await sendNotificationToStudentsOfClassGroup(
          this.connection,
          session.classGroup._id,
          {
            topic: NOTIFICATION_TYPES_ENUM.SESSION_NOTES,
            details: { studentNewId: "", sessionNewId: session.newId },
          },
          { $teacherName: session.teacher!.fullName, $topicName: topicName },
          dto.tenantId,
          this.clientSession,
        );
      }

      if (session.group) {
        await sendNotificationToStudentsOfGroup(
          this.connection,
          session.group.students,
          {
            topic: NOTIFICATION_TYPES_ENUM.SESSION_NOTES,
            details: { studentNewId: "", sessionNewId: session.newId },
          },
          { $teacherName: session.teacher!.fullName, $topicName: topicName },
          dto.tenantId,
          this.clientSession,
        );
      }
    }

    return this.getSessionDetailsUseCase.execute({
      sessionNewId: session.newId,
      userDetails: { user: dto.user, type: dto.userType },
      tenantId: this.school._id,
    });
  }
}
