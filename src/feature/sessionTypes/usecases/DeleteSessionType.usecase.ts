import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SessionTypeRepo } from "../repos/SessionType.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteSessionTypeUseCase {
  constructor(
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(sessionTypeNewId: string): Promise<void> {
    const sessionType = await this.sessionTypeRepo.findOneByNewIdOrThrow(
      sessionTypeNewId,
      "notFound.sessionType",
    );

    const sessionsBySessionType = await this.sessionRepo.findManyBySessionType(sessionType._id);

    if (sessionsBySessionType.length > 0) throw new BadRequestError("alreadyUsed.sessionType");

    await this.sessionTypeRepo.deleteOneById(sessionType._id);
  }
}
