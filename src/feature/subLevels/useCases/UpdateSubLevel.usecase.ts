import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { SubLevel } from "../domains/subLevel.entity";
import { SubLevelRepo } from "../domains/SubLevel.repo";

@injectable()
export class UpdateSubLevelUseCase {
  constructor(@inject("SubLevelRepo") private subLevelRepo: SubLevelRepo) {}

  async execute(
    subLevelNewId: string,
    data: Partial<{ name: string; hasSections: boolean }>,
  ): Promise<void> {
    const subLevel = await this.subLevelRepo.findOneByNewIdOrThrow(
      subLevelNewId,
      "notFound.subLevel",
    );

    if (data.name && subLevel.name !== data.name)
      await this.subLevelRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    if (data.hasSections === false)
      this.ensureNoSectionsBeforeDisabling(subLevel, data.hasSections);

    await this.subLevelRepo.updateOneByNewId(subLevelNewId, data);
  }

  private ensureNoSectionsBeforeDisabling(subLevel: SubLevel, newHasSections: boolean): void {
    const isDisablingSections = subLevel.hasSections && newHasSections === false;

    if (!isDisablingSections) return;
  }
}
