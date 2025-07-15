import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { SubSubjectTypesRepo } from "../repos/SubSubjectTypes.repo";

@injectable()
export class AddSubSubjectTypeUseCase {
  constructor(@inject("SubSubjectTypeRepo") private subSubjectTypeRepo: SubSubjectTypesRepo) {}

  async execute(data: {
    name: string;
    preferredStartingHours?: number[];
    illustration: string;
  }): Promise<void> {
    await this.subSubjectTypeRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");
    await this.subSubjectTypeRepo.addOne({
      ...data,
      preferredStartingHours: data.preferredStartingHours || [],
      illustration: data.illustration,
    });
  }
}
