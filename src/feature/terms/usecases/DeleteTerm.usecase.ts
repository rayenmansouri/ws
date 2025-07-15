import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolYearRepo } from "../../schoolYears/domain/SchoolYear.repo";
import { TermRepo } from "../repos/Term.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteTermUseCase {
  constructor(
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
  ) {}

  async execute(termNewId: string): Promise<void> {
    const term = await this.termRepo.findOneByNewIdOrThrow(termNewId, "notFound.term");

    const schoolYearUsedTerm = await this.schoolYearRepo.findOneByTerm(term._id);

    if (schoolYearUsedTerm) throw new BadRequestError("alreadyUsed.term");

    await this.termRepo.deleteOneById(term._id);
  }
}
