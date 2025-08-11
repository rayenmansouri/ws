import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubSubjectTypesRepo } from "../repos/SubSubjectTypes.repo";
import { ClassTypeRepo } from "../../classTypes/repo/ClassType.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteSubSubjectTypeUseCase {
  constructor(
    @inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo,
    @inject("ClassTypeRepo") private classTypeRepo: ClassTypeRepo,
  ) {}

  async execute(subSubjectTypeNewId: string): Promise<void> {
    const subSubjectType = await this.subSubjectTypeRepo.findOneByNewIdOrThrow(
      subSubjectTypeNewId,
      "notFound.subSubjectType",
    );

    const classTypeUsingSubSubjectType = await this.classTypeRepo.findManyBySubSubjectType(
      subSubjectType._id,
    );
    if (classTypeUsingSubSubjectType.length > 0) {
      throw new BadRequestError("classType.subSubjectTypeAlreadyUsed");
    }

    await this.subSubjectTypeRepo.deleteOneById(subSubjectType._id);
  }
}
