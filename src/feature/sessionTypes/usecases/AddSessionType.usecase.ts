import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SessionTypeRepo } from "../repos/SessionType.repo";

@injectable()
export class AddSessionTypeUseCase {
  constructor(@inject("SessionTypeRepo") private sessionTypeRepo: SessionTypeRepo) {}

  async execute(data: { name: string }): Promise<void> {
    await this.sessionTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.sessionTypeRepo.addOne(data);
  }
}
