import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { Section } from "../domain/section.entity";
import { SectionRepo } from "../repos/Section.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class AddSectionUseCase {
  constructor(
    @inject("SectionRepo") private sectionRepo: SectionRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
  ) {}

  async execute(data: { name: string; subLevelNewIds: string[] }): Promise<Section> {
    await this.sectionRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    const subLevels = await this.subLevelRepo.findManyByNewIdsOrThrow(
      data.subLevelNewIds,
      "notFound.subLevel",
    );

    subLevels.forEach(subLevel => {
      if (!subLevel.hasSections) throw new BadRequestError("invalid.subLevel");
    });

    const subLevelIds = subLevels.map(subLevel => subLevel._id);
    const section = await this.sectionRepo.addOne({
      name: data.name,
      subLevels: subLevelIds,
    });

    return section;
  }
}
