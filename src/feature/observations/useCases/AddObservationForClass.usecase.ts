import { injectable } from "inversify/lib/inversify";
import { Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { FileManager, FileUploadPayload } from "../../../core/fileManager/FileManager";
import { NOTIFICATION_TYPES_ENUM } from "../../../features/notification/constants/constants";
import { sendNotificationToParentsOfStudent } from "../../../features/notification/services/helpers.service";
import { ID } from "../../../types/BaseEntity";
import { ClassRepo } from "../../classes/domain/Class.repo";
import { ClassService } from "../../classes/domain/Class.service";
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

type AddObservationForClassUseCaseParams = {
  studentNewIds: string[];
  note: string;
  sessionId: ID | null;
  files: FileUploadPayload[];
  observationReasonNewId: string;
  user: BaseUser;
  userType: "teacher" | "admin";
  classNewId: string;
  tenantId: string;
};

@injectable()
export class AddObservationForClassUseCase {
  constructor(
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("FileManager") private fileManager: FileManager,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
    @inject("ObservationReasonRepo") private observationReasonRepo: ObservationReasonRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
    @inject("School") private school: School,
    @inject("ClassRepo") private classRepo: ClassRepo,
    @inject("Connection") private connection: Connection,
  ) {}

  async execute(params: AddObservationForClassUseCaseParams): Promise<ObservationDTO> {
    const { studentNewIds, note, sessionId, files, observationReasonNewId, classNewId } = params;

    const observationReason = await this.observationReasonRepo.findOneByNewIdOrThrow(
      observationReasonNewId,
      "notFound.observationReason",
    );

    const students = await this.studentRepo.findManyByNewIdsOrThrow(
      studentNewIds,
      "notFound.student",
    );

    const session = sessionId
      ? await this.sessionRepo.findOneByIdOrThrow(sessionId, "notFound.session")
      : null;

    const paths = FileManager.generateFilePaths(files, params.tenantId, "observation");

    const fileUploads = await this.fileManager.uploadFiles(files, paths);
    const classDoc = await this.classRepo.findOneByNewIdOrThrow(classNewId, "notFound.class");

    ClassService.checkStudentIncludeInClass(students, classDoc);

    const observation = await this.observationRepo.addOne({
      observationReason,
      issuer: params.user._id,
      issuerType: params.userType,
      note,
      students: students.map(student => student._id),
      class: classDoc._id,
      group: null,
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
