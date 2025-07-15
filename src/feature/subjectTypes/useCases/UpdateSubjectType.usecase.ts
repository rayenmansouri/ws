import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubjectTypeRepo } from "../domains/SubjectType.repo";

@injectable()
export class UpdateSubjectTypeUseCase {
  constructor(@inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo) {}

  async execute(
    subjectTypeNewId: string,
    data: Partial<{
      name: string;
      preferredStartingHours: number[];
      illustration: string;
    }>,
  ): Promise<void> {
    const subjectType = await this.subjectTypesRepo.findOneByNewIdOrThrow(
      subjectTypeNewId,
      "notFound.subjectType",
    );

    if (data.name && data.name !== subjectType.name)
      await this.subjectTypesRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.subjectTypesRepo.updateOneById(subjectType._id, {
      ...data,
      illustration: data.illustration || undefined,
    });
  }
}
