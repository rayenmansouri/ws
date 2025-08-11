import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SchoolYearRepo } from "../domain/SchoolYear.repo";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { SchoolYear } from "../domain/schoolYear.entity";

@injectable()
export class AddSchoolYearUseCase {
  constructor(
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
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

    const schoolYearWithSameRange = await this.schoolYearRepo.findByLevelAndRange(level._id, {
      startDate: data.startDate,
      endDate: data.endDate,
    });

    if (schoolYearWithSameRange) throw new BadRequestError("alreadyExist.schoolYear");

    return await this.schoolYearRepo.addOne({
      name: data.name,
      startDate: data.startDate,
      endDate: data.endDate,
      level: level._id,
    });
  }
}
