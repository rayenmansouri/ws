import { injectable } from "inversify";
import { Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { Session, SESSION_STATUS_ENUM } from "../domain/session.entity";
import { SessionRepo } from "../domain/Session.repo";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { schoolDocStore } from "./../../../core/subdomainStore";
import { MINUTES_TO_MILLISECOND } from "./../../../helpers/constants";
import { convertDateToServerTime } from "./../../../helpers/ConvertDate";
import { ID } from "./../../../types/BaseEntity";
import { SessionService } from "./../domain/Session.service";

export type StartSessionRequestDTO = {
  sessionNewId: string;
  userId: ID;
  userType: "admin" | "teacher";
  tenantId: ID;
};

@injectable()
export class StartSessionUseCase {
  constructor(
    @inject("Connection") private readonly connection: Connection,
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
  ) {}

  async execute(dto: StartSessionRequestDTO): Promise<void> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(
      dto.sessionNewId,
      "notFound.session",
      { populate: ["class", "classGroup", "group"] },
    );

    let inProgressSessionOfTeacher: Session | null = null;

    if (dto.userType === "teacher") {
      inProgressSessionOfTeacher = await this.sessionRepo.findInProgressSessionByTeacherId(
        dto.userId,
        [session._id],
      );
    }

    SessionService.ensureSessionCanBeStarted(
      session,
      { type: dto.userType, id: dto.userId },
      dto.tenantId,
      inProgressSessionOfTeacher,
    );

    const studentIds: ID[] = SessionService.extractStudentIdsFromSession(
      session.class,
      session.classGroup,
      session.group,
    );
    let previousAttendance = await this.sessionRepo.getLastStudentsAttendanceOfSession(
      { _id: session._id, startTime: session.startTime },
      studentIds,
    );

    if (Object.entries(previousAttendance).length === 0)
      previousAttendance = SessionService.generateInitialAttendance(studentIds, "present");

    if (session.status === "waiting") {
      await this.sessionRepo.updateOneById(session._id, {
        status: SESSION_STATUS_ENUM.IN_PROGRESS,
        attendence: previousAttendance,
        launchTime: getCurrentTimeOfSchool(dto.tenantId),
      });
    }

    if (session.status === "canceled") {
      await this.sessionRepo.updateOneById(session._id, {
        attendence: previousAttendance,
        status: SESSION_STATUS_ENUM.IN_PROGRESS,
        launchTime: getCurrentTimeOfSchool(dto.tenantId),
        reasonForCanceling: null,
      });
    }

    // const closeAt = new Date(
    //   convertDateToServerTime(new Date(session.endTime), dto.tenantId).getTime() +
    //     schoolDocStore[dto.tenantId].forceCloseSessionDelayInMin * MINUTES_TO_MILLISECOND,
    // );
    // need to implement force close session logic with cron
    //forceCloseSessionsJob(this.connection, session._id, closeAt, dto.tenantId);
  }
}
