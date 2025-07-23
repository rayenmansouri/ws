import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SESSION_STATUS_ENUM } from "../../../database/schema/pedagogy/session/session.schema";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";

@injectable()
export class DeleteSessionUseCase {
  constructor(@inject("SessionRepo") private sessionRepo: SessionRepo) {}

  async execute(sessionNewId: string): Promise<void> {
    const session = await this.sessionRepo.findOneByNewIdOrThrow(sessionNewId, "notFound.session");

    if (
      session.status !== SESSION_STATUS_ENUM.WAITING &&
      session.status !== SESSION_STATUS_ENUM.CANCELED
    ) {
      throw new BadRequestError("session.onlyPendingCanceledSessionCanBeDeleted");
    }

    if (session.isTeacherPaid) throw new BadRequestError("session.teacherOfThisSessionAlreadyPaid");

    await this.sessionRepo.deleteOneById(session._id);
  }
}
