import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubSubjectTypesRepo } from "../repos/SubSubjectTypes.repo";

@injectable()
export class UpdateSubSubjectTypeUsecase {
  constructor(@inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo) {}

  async execute(
    subSubjectTypeNewId: string,
    data: Partial<{
      name: string;
      preferredStartingHours: number[];
      illustration: string;
    }>,
  ): Promise<void> {
    const subSubjectType = await this.subSubjectTypeRepo.findOneByNewIdOrThrow(
      subSubjectTypeNewId,
      "notFound.subSubjectType",
    );

    if (data.name && data.name != subSubjectType.name)
      await this.subSubjectTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.subSubjectTypeRepo.updateOneById(subSubjectType._id, {
      ...data,
      illustration: data.illustration,
    });
  }
}
