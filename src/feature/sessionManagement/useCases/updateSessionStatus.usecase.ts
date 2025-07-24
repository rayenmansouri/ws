import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { getCurrentTimeOfSchool } from "../../../core/getCurrentTimeOfSchool";
import { ID } from "../../../types/BaseEntity";
import { SessionRepo } from "../domain/Session.repo";
import { SessionService } from "../domain/Session.service";
import { StartSessionUseCase } from "./startSession.usecase";
import { TSessionStatusEnum } from "../domain/session.entity";

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
