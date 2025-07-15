import { injectable } from "inversify/lib/inversify";
import { pick } from "lodash";
import { inject } from "../../../core/container/TypedContainer";
import { NotFoundError } from "../../../core/ApplicationErrors";
import { ClassTypeService } from "../../classTypes/domains/ClassType.service";
import { LevelRepo } from "../repos/Level.repo";

@injectable()
export class ReorderLevelsUseCase {
  constructor(@inject("LevelRepo") private levelRepo: LevelRepo) {}

  async execute(levelNewId: string, newRank: number): Promise<void> {
    const levels = (await this.levelRepo.findAll()).sort((a, b) => a.rank - b.rank);

    const level = levels.find(level => level.newId === levelNewId);

    if (!level) throw new NotFoundError("notFound.level");

    //TODO need to move the reorderArray to a helper in other service
    const newLevels = ClassTypeService.reorderArray(levels, level.rank, newRank);

    await Promise.all(
      newLevels.map((level, index) => this.levelRepo.updateOneById(level._id, { rank: index })),
    );
  }
}
