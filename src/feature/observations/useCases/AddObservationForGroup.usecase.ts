import { injectable } from "inversify/lib/inversify";
import { Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { NOTIFICATION_TYPES_ENUM } from "../../../features/notification/constants/constants";
import { sendNotificationToParentsOfStudent } from "../../../features/notification/services/helpers.service";
import { ID } from "../../../types/BaseEntity";
import { GroupService } from "../../groupManagement/domains/Group.service";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { ObservationReasonRepo } from "../../observationsReason/domains/ObservationReason.repo";
import { School } from "../../schools/domain/school.entity";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { Student } from "../../students/domain/student.entity";
import { StudentRepo } from "../../students/domain/Student.repo";
import { BaseUser } from "../../users/domain/baseUser.entity";
import { Observation } from "../domain/observation.entity";
import { ObservationRepo } from "../domain/Observation.repo";
import { ObservationDTO } from "../dtos/observation.dto";
import { ObservationMapper } from "../mappers/Observation.mapper";

type AddObservationForGroupUseCaseParams = {
  studentNewIds: string[];
  note: string;
  sessionId: ID | null;
  files: FileUploadPayload[];
  observationReasonNewId: string;
  user: BaseUser;
  userType: "teacher" | "admin";
  groupNewId: string;
  tenantId: string;
};

@injectable()
export class AddObservationForGroupUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("ObservationReasonRepo") private observationReasonRepo: ObservationReasonRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
    @inject("School") private school: School,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("Connection") private connection: Connection,
  ) {}

  async execute(params: AddObservationForGroupUseCaseParams): Promise<ObservationDTO> {
    const { studentNewIds, note, sessionId, files, observationReasonNewId, groupNewId } = params;

    const observationReason = await this.observationReasonRepo.findOneByNewIdOrThrow(
      observationReasonNewId,
      "notFound.observationReason",
    );

    const students = await this.studentRepo.findManyByNewIdsOrThrow(
      studentNewIds,
      "notFound.student",
    );

    const session = sessionId
      ? await this.sessionRepo.findOneByNewIdOrThrow(sessionId, "notFound.session")
      : null;

    const paths = FileManager.generateFilePaths(files, params.tenantId, "observation");

    const fileUploads = await this.fileManager.uploadFiles(files, paths);

    const groupDoc = await this.groupRepo.findOneByNewIdOrThrow(groupNewId, "notFound.group");

    const studentIds = students.map(student => student._id);
    GroupService.ensureStudentsIncludedInGroup(studentIds, groupDoc);

    const observation = await this.observationRepo.addOne({
      observationReason,
      issuer: params.user._id,
      issuerType: params.userType,
      note,
      students: studentIds,
      class: null,
      group: groupDoc._id,
      files: fileUploads,
      session: session?._id || null,
    });

    void this.sendNotification(students, observation, params.user.fullName);

    return ObservationMapper.toObservationDTO(
      { ...observation, students, issuer: params.user },
      null,
    );
  }

  private async sendNotification(
    students: Student[],
    observation: Observation,
    issuerFullName: string,
  ): Promise<void> {
    const sendNotificationToParentPromises = [];

    for (const student of students) {
      sendNotificationToParentPromises.push(
        sendNotificationToParentsOfStudent(
          this.connection,
          String(student._id),
          {
            topic: NOTIFICATION_TYPES_ENUM.OBSERVATIONS,
            details: { studentNewId: student.newId, punishmentNewId: observation.newId },
          },
          {
            $issuerName: issuerFullName,
            $studentName: student.fullName,
            $reason: observation.observationReason.name,
          },
          this.school._id,
        ),
      );
    }
    await Promise.all(sendNotificationToParentPromises);
  }
}
