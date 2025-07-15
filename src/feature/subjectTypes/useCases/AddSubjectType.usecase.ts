import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubjectTypeRepo } from "../domains/SubjectType.repo";

@injectable()
export class AddSubjectTypeUseCase {
  constructor(@inject("SubjectTypeRepo") private subjectTypesRepo: SubjectTypeRepo) {}

  async execute(data: {
    name: string;
    preferredStartingHours?: number[];
    illustration: string;
  }): Promise<void> {
    await this.subjectTypesRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");

    await this.subjectTypesRepo.addOne({
      ...data,
      preferredStartingHours: data.preferredStartingHours || [],
      illustration: data.illustration,
    });
  }
}
