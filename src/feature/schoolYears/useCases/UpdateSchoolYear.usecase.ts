import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { LevelRepo } from "../../levels/repos/Level.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { SchoolYear } from "../domain/schoolYear.entity";
import { SchoolYearRepo } from "../domain/SchoolYear.repo";

@injectable()
export class UpdateSchoolYearUseCase {
  constructor(
    @inject("SchoolYearRepo") private schoolYearRepo: SchoolYearRepo,
    @inject("LevelRepo") private levelRepo: LevelRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(
    schoolYearNewId: string,
    data: Partial<{ name: string; terms: { termNewId: string; startDate: Date; endDate: Date }[] }>,
  ): Promise<void> {
    const schoolYear = await this.schoolYearRepo.findOneByNewIdOrThrow(
      schoolYearNewId,
      "notFound.schoolYear",
    );

    const updatePayload: Partial<SchoolYear> = {};

    if (data.name) updatePayload.name = data.name;

    const updatedSchoolYear = (await this.schoolYearRepo.updateOneById(
      schoolYear._id,
      updatePayload,
    ))!;

    await this.levelRepo.updateSchoolYear(schoolYear._id, updatedSchoolYear);

    await this.subLevelRepo.updateSchoolYear(schoolYear._id, updatedSchoolYear);
  }
}
