import { injectable } from "inversify";
import { difference } from "lodash";
import { inject } from "../../../core/container/TypedContainer";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { SubLevelRepo } from "../../subLevels/domains/SubLevel.repo";
import { Section } from "../domain/section.entity";
import { SectionRepo } from "../repos/Section.repo";
import { ID } from "../../../types/BaseEntity";

@injectable()
export class UpdateSectionUseCase {
  constructor(
    @inject("SectionRepo") private sectionRepo: SectionRepo,
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(
    sectionNewId: string,
    data: Partial<{
      name: string;
      subLevelNewIds: string[];
    }>,
  ) {
    const section = await this.sectionRepo.findOneByNewIdOrThrow(sectionNewId, "notFound.section");

    data.name &&
      data.name != section.name &&
      (await this.sectionRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name"));

    const newSubLevelIds = data.subLevelNewIds
      ? await this.handleSubLevels(data.subLevelNewIds, section)
      : undefined;

    await this.sectionRepo.updateOneById(section._id, {
      name: data.name || section.name,
      subLevels: newSubLevelIds || section.subLevels,
    });

    return {
      ...section,
      name: data.name || section.name,
      subLevels: newSubLevelIds || section.subLevels,
    };
  }

  private async handleSubLevels(subLevelNewIds: string[], section: Section): Promise<ID[]> {
    const subLevels = await this.subLevelRepo.findManyByNewIdsOrThrow(
      subLevelNewIds,
      "notFound.subLevel",
    );

    const oldSubLevelIds = section.subLevels;

    subLevels.forEach(subLevel => {
      if (!subLevel.hasSections) throw new BadRequestError("invalid.subLevels");
    });

    const newSubLevelIds = subLevels.map(subLevel => subLevel._id);

    const subLevelsToRemoveIds = difference(oldSubLevelIds, newSubLevelIds);

    const classTypes = await this.classTypeRepo.findManyBySubLevelsAndSection(
      subLevelsToRemoveIds,
      section._id,
    );

    if (classTypes.length > 0) throw new BadRequestError("classType.linkedWithSomeSection");

    return newSubLevelIds;
  }
}
