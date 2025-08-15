import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubLevelRepo } from "../domains/SubLevel.repo";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";

@injectable()
export class ReorderSubLevelsUseCase {
  constructor(@inject("SubLevelRepo") private subLevelRepo: SubLevelRepo) {}

  async execute(subLevelNewId: string, newRank: number): Promise<void> {
    const subLevels = (await this.subLevelRepo.findAll()).sort((a, b) => a.rank - b.rank);

    const subLevel = subLevels.find(subLevel => subLevel.newId === subLevelNewId);

    if (!subLevel) throw new NotFoundError("notFound.subLevel");

    const newSubLevels = ClassTypeService.reorderArray(subLevels, subLevel.rank, newRank);

    await Promise.all(
      newSubLevels.map((subLevel, index) =>
        this.subLevelRepo.updateOneById(subLevel._id, { rank: index }),
      ),
    );
    return;
  }
}
