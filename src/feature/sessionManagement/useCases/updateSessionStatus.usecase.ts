import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { TSessionStatusEnum } from "../../../database/schema/pedagogy/session/session.schema";
import { HOMEWORK_STATUS_ENUM } from "../../../features/homework/constants/shared/addHomework.constants";
import { ID } from "../../../types/BaseEntity";
import { HomeworkRepo } from "../../homeworks/domain/Homework.repo";
import { SessionRepo } from "../domain/Session.repo";
import { SessionService } from "../domain/Session.service";
import { StartSessionUseCase } from "./startSession.usecase";

export type UpdateSessionStatusRequestDTO = {
  sessionNewId: string;
  tenantId: ID;
  newStatus: TSessionStatusEnum;
  userId: ID;
  userType: "admin";
};

export type UpdateSessionStatusUseCaseResponse = {
  status: TSessionStatusEnum;
};

@injectable()
export class UpdateSessionStatusUseCase {
  constructor(
    @inject("SessionRepo") private readonly sessionRepo: SessionRepo,
    @inject("HomeworkRepo") private readonly homeworkRepo: HomeworkRepo,
    @inject("StartSessionUseCase") private readonly startSessionUseCase: StartSessionUseCase,
  ) {}

  async execute(dto: UpdateSessionStatusRequestDTO): Promise<UpdateSessionStatusUseCaseResponse> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(
      dto.sessionNewId,
      "notFound.session",
      { populate: ["class", "classGroup", "group"] },
    );

    if (session.isTeacherPaid) throw new BadRequestError("session.sessionIsAlreadyPaid");

    SessionService.ensureSessionStatusCanBeUpdated(
      {
        status: session.status,
        isTeacherPaid: session.isTeacherPaid,
        startTime: session.startTime,
        endTime: session.endTime,
      },
      dto.newStatus,
      dto.tenantId,
    );

    if (
      dto.newStatus === "waiting" &&
      session.startTime.getTime() > getCurrentTimeOfSchool(dto.tenantId).getTime()
    )
      await this.sessionRepo.updateOneById(session._id, { status: dto.newStatus });

    if (dto.newStatus === "completed") {
      if (session.endTime.getTime() < getCurrentTimeOfSchool(dto.tenantId).getTime()) {
        const studentsIds = SessionService.extractStudentIdsFromSession(
          session.class,
          session.classGroup,
          session.group,
        );

        const attendance = await this.sessionRepo.getLastStudentsAttendanceOfSession(
          { _id: session._id, startTime: session.startTime },
          studentsIds,
        );

        await this.sessionRepo.updateOneById(session._id, {
          status: dto.newStatus,
          attendence: attendance,
          closeTime: getCurrentTimeOfSchool(dto.tenantId),
        });

        await this.homeworkRepo.updateManyByIds(
          [...session.homeworkGiven, ...session.homeworkToDo],
          { status: HOMEWORK_STATUS_ENUM.DONE },
        );
      }
    }

    if (dto.newStatus === "inProgress" && session.status !== "completed")
      await this.startSessionUseCase.execute({
        sessionNewId: session.newId,
        tenantId: dto.tenantId,
        userId: dto.userId,
        userType: dto.userType,
      });

    return { status: dto.newStatus };
  }
}
