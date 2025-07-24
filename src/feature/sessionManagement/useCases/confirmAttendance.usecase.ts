import { injectable } from "inversify";
import { Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { StudentRepo } from "../../students/domain/Student.repo";
import { SessionRepo } from "../domain/Session.repo";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { sendNotificationsToParentsBasedOnAttendance } from "./../../../features/notification/services/helpers.service";
import { ID } from "./../../../types/BaseEntity";
import { SessionService } from "./../domain/Session.service";
import { TAttendanceEnum } from "../domain/session.entity";

export type ConfirmAttendanceRequestDTO = {
  sessionNewId: string;
  userId: ID;
  userType: "teacher" | "admin";
  attendanceStatus: TAttendanceEnum;
  tenantId: ID;
  studentId: ID;
};

@injectable()
export class ConfirmAttendanceUseCase {
  constructor(
    @inject("Connection") private readonly connection: Connection,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
    @inject("StudentRepo") private readonly studentRepo: StudentRepo,
  ) {}

  async execute(dto: ConfirmAttendanceRequestDTO): Promise<void> {
    const [session, student] = await Promise.all([
      this.sessionRepo.findOneByNewIdOrThrow(dto.sessionNewId, "notFound.session", {
        populate: ["subjectType", "subSubjectType", "group", "class"],
      }),

      this.studentRepo.findOneByIdOrThrow(dto.studentId, "notFound.student"),
    ]);

    if (dto.userType === "teacher") {
      if (!SessionService.isSessionBelongingToTeacher(dto.userId, session))
        throw new BadRequestError("teacher.sessionDoesNotBelongsToThisTeacher");

      SessionService.ensureAttendanceConfirmationStillAllowed(
        session.endTime,
        session.status,
        getCurrentTimeOfSchool(dto.tenantId),
      );
    }
    const studentsOfClassIds: ID[] | null = session.class ? session.class.students : null;

    const studentsOfGroupIds: ID[] | null = session.group ? session.group.students : null;

    SessionService.ensureStudentBelongsToSession(
      { studentsOfClassIds, studentsOfGroupIds },
      student._id,
    );

    await this.sessionRepo.updateStudentAttendance(session._id, student._id, dto.attendanceStatus);

    const topicName = SessionService.extractTopicName(
      session.subjectType,
      session.subSubjectType,
      session.group,
    );

    const newAttendance: Record<ID, TAttendanceEnum> = { [student._id]: dto.attendanceStatus };

    sendNotificationsToParentsBasedOnAttendance(
      this.connection,
      newAttendance,
      topicName,
      dto.tenantId,
      session.newId,
    );
  }
}
