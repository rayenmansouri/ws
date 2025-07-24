import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SessionRepo } from "../domain/Session.repo";
import { getCurrentTimeOfSchool } from "./../../../core/getCurrentTimeOfSchool";
import { ID } from "./../../../types/BaseEntity";
import { SessionService } from "./../domain/Session.service";
import { SESSION_STATUS_ENUM } from "../domain/session.entity";

export type CloseSessionRequestDTO = {
  sessionNewId: string;
  teacherId: ID;
  tenantId: ID;
};

@injectable()
export class CloseSessionUseCase {
  constructor(@inject("SessionRepo") private readonly sessionRepo: SessionRepo) {}

  async execute(dto: CloseSessionRequestDTO): Promise<void> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(
      dto.sessionNewId,
      "notFound.session",
    );

    SessionService.ensureSessionCanBeTerminated(session.endTime, dto.tenantId, session.status);

    const closeSessionPromise = this.sessionRepo.updateOneById(session._id, {
      status: SESSION_STATUS_ENUM.COMPLETED,
      closeTime: getCurrentTimeOfSchool(dto.tenantId),
    });

    await Promise.all([closeSessionPromise]);
  }
}
