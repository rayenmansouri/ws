import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolYearRepo } from "../domain/SchoolYear.repo";
import { TermRepo } from "../../terms/repos/Term.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SchoolYear } from "../domain/schoolYear.entity";

@injectable()
export class AddSchoolYearUseCase {
  constructor(
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("TermRepo") private termRepo: TermRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
  ) {}

  async execute(data: {
    name: string;
    startDate: Date;
    endDate: Date;
    terms: { termNewId: string; startDate: Date; endDate: Date }[];
    levelNewId: string;
  }): Promise<SchoolYear> {
    const level = await this.levelRepo.findOneByNewIdOrThrow(data.levelNewId, "notFound.level");

    const termNewIds = data.terms.map(term => term.termNewId);
    const termDocs = await this.termRepo.findManyByNewIdsOrThrow(termNewIds, "notFound.term");
    const termsWithRange = termDocs.map(termDoc => {
      const termWithRange = data.terms.find(term => term.termNewId === termDoc.newId)!;

      return {
        ...termDoc,
        startDate: termWithRange.startDate,
        endDate: termWithRange.endDate,
      };
    });

    const schoolYearWithSameRange = await this.schoolYearRepo.findByLevelAndRange(level._id, {
      startDate: data.startDate,
      endDate: data.endDate,
    });

    if (schoolYearWithSameRange) throw new BadRequestError("alreadyExist.schoolYear");

    return await this.schoolYearRepo.addOne({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      terms: termsWithRange,
      level: level._id,
    });
  }
}
