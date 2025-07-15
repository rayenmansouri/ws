import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { TermRepo } from "../repos/Term.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { Term } from "../domains/term.entity";

@injectable()
export class UpdateTermUseCase {
  constructor(
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(termNewId: string, data: Partial<Term>): Promise<void> {
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    if (data.name && data.name !== term.name)
      await this.termRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.schoolYearRepo.updateTerm(term._id, data);

    await this.levelRepo.updateTerm(term._id, data);

    await this.subLevelRepo.updateTerm(term._id, data);

    await this.termRepo.updateOneById(term._id, data);

    return;
  }
}
