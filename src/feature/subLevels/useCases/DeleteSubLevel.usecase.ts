import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubLevelRepo } from "../domains/SubLevel.repo";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { SectionRepo } from "../../sections/repos/Section.repo";
import { SubLevel } from "../domains/subLevel.entity";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";

@injectable()
export class DeleteSubLevelUseCase {
  constructor(
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SectionRepo") private sectionRepo: SectionRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(subLevelNewId: string): Promise<void> {
    const subLevel = await this.subLevelRepo.findOneByNewIdOrThrow(
      subLevelNewId,
      "notFound.subLevel",
    );

    await this.ensureSubLevelHasNoGroup(subLevel);
    await this.ensureSubLevelHasNoSection(subLevel);
    await this.ensureSubLevelHasNoClassType(subLevel);

    await this.subLevelRepo.deleteOneById(subLevel._id);
  }

  private async ensureSubLevelHasNoGroup(subLevel: SubLevel): Promise<void> {
    const levelId = subLevel.level._id;
    const groupsOfSubLevel = await this.groupRepo.findManyByLevels([levelId]);
    const hasGroups = groupsOfSubLevel.length !== 0;

    if (hasGroups) throw new BadRequestError("subLevel.hasGroups");
  }

  private async ensureSubLevelHasNoClassType(subLevel: SubLevel): Promise<void> {
    const classTypeOfSubLevel = await this.classTypeRepo.findManySubLevels([subLevel._id]);
    const hasClassTypes = classTypeOfSubLevel.length !== 0;

    if (hasClassTypes) throw new BadRequestError("subLevel.hasClassType");
  }

  private async ensureSubLevelHasNoSection(subLevel: SubLevel): Promise<void> {
    const sectionsOfSubLevel = await this.sectionRepo.findManyBySubLevel(subLevel._id);

    const hasSections = sectionsOfSubLevel.length !== 0;

    if (hasSections) throw new BadRequestError("subLevel.hasSections");
  }
}
