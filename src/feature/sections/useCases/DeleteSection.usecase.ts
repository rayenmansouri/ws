import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SectionRepo } from "../repos/Section.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteSectionUseCase {
  constructor(
    @inject("SectionRepo") private sectionRepo: SectionRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(sectionNewId: string): Promise<void> {
    const section = await this.sectionRepo.findOneByNewIdOrThrow(sectionNewId, "notFound.section");

    const classTypes = await this.classTypeRepo.findManySection(section._id);

    if (classTypes.length) throw new BadRequestError("classType.linkedWithSomeSection");

    await this.sectionRepo.deleteOneById(section._id);
  }
}
