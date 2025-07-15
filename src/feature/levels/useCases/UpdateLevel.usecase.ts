import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { Level, TEstablishmentTitleEnum } from "../domains/level.entity";
import { LevelRepo } from "../repos/Level.repo";

@injectable()
export class UpdateLevelUseCase {
  constructor(
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(
    levelNewId: string,
    data: Partial<{
      name: string;
      color: string;
      establishmentTitle: TEstablishmentTitleEnum;
    }>,
  ): Promise<void> {
    const level = await this.levelRepo.findOneByNewIdOrThrow(levelNewId, "notFound.level");

    if (data.name && level.name !== data.name) {
      await this.levelRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");
    }

    const newLevel: Level = {
      ...level,
      name: data.name || level.name,
      color: data.color || level.color,
      establishmentTitle: data.establishmentTitle || level.establishmentTitle,
    };

    await this.levelRepo.updateOneById(level._id, newLevel);
    await this.subLevelRepo.updateManyByLevel(level._id, { level: newLevel });
  }
}
