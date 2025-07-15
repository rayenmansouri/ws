import { injectable } from "inversify";
import { SubLevelRepo } from "../domains/SubLevel.repo";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";

@injectable()
export class AddSubLevelUseCase {
  constructor(
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(data: { name: string; hasSections: boolean; levelNewId: string }): Promise<void> {
    await this.subLevelRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const level = await this.levelRepo.findOneByNewIdOrThrow(data.levelNewId, "notFound.level");

    const subLevelRank = await this.subLevelRepo.count();

    await this.subLevelRepo.addOne({
      name: data.name,
      hasSections: data.hasSections,
      level,
      rank: subLevelRank,
    });
  }
}
