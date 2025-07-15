import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SessionTypeRepo } from "../repos/SessionType.repo";
import { SessionRepo } from "../../sessionManagement/domain/Session.repo";

@injectable()
export class UpdateSessionTypeUseCase {
  constructor(
    @inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo,
    @inject("SessionRepo") private sessionRepo: SessionRepo,
  ) {}

  async execute(sessionTypeNewId: string, data: Partial<{ name: string }>): Promise<void> {
    const sessionType = await this.sessionTypeRepo.findOneByNewIdOrThrow(
      sessionTypeNewId,
      "notFound.sessionType",
    );

    if (data.name && data.name !== sessionType.name) {
      await this.sessionTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");
    }

    await this.sessionTypeRepo.updateOneById(sessionType._id, data);

    await this.sessionRepo.updateSessionType(sessionType._id, {
      ...sessionType,
      name: data.name || sessionType.name,
    });
  }
}
