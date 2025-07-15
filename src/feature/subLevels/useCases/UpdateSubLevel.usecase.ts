import { injectable } from "inversify";
import { BadRequestError } from "../../../core/ApplicationErrors";
import { inject } from "../../../core/container/TypedContainer";
import { GroupRepo } from "../../groupManagement/repos/Group.repo";
import { SectionRepo } from "../../sections/repos/Section.repo";
import { StudentRepo } from "../../students/domain/Student.repo";
import { StudentProfileRepo } from "../../students/domain/StudentProfile.repo";
import { SubLevel } from "../domains/subLevel.entity";
import { SubLevelRepo } from "../domains/SubLevel.repo";

@injectable()
export class UpdateSubLevelUseCase {
  constructor(
    @inject("SubLevelRepo") private subLevelRepo: SubLevelRepo,
    @inject("GroupRepo") private groupRepo: GroupRepo,
    @inject("SectionRepo") private sectionRepo: SectionRepo,
    @inject("StudentRepo") private studentRepo: StudentRepo,
    @inject("StudentProfileRepo") private studentProfileRepo: StudentProfileRepo,
  ) {}

  async execute(
    subLevelNewId: string,
    data: Partial<{ name: string; hasSections: boolean }>,
  ): Promise<void> {
    const subLevel = await this.subLevelRepo.findOneByNewIdOrThrow(
      subLevelNewId,
      "notFound.subLevel",
    );

    if (data.name && subLevel.name !== data.name)
      await this.subLevelRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    if (data.hasSections === false)
      await this.ensureNoSectionsBeforeDisabling(subLevel, data.hasSections);

    await this.subLevelRepo.updateOneByNewId(subLevelNewId, data);
  }

  private async ensureNoSectionsBeforeDisabling(
    subLevel: SubLevel,
    newHasSections: boolean,
  ): Promise<void> {
    const isDisablingSections = subLevel.hasSections && newHasSections === false;

    if (!isDisablingSections) return;

    const sections = await this.sectionRepo.findManyBySubLevel(subLevel._id);

    const subLevelHasSections = sections.length !== 0;
    if (subLevelHasSections) throw new BadRequestError("subLevel.hasSections");
  }
}
