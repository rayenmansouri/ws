import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { schoolDocStore } from "../../../core/subdomainStore";
import { TFeatureFlagsEnum } from "../constants/featureFlags";
import { SchoolRepo } from "../domain/School.repo";

@injectable()
export class UpdateFlagsUseCase {
  constructor(@inject("SchoolRepo") private schoolRepo: SchoolRepo) {}

  async execute(schoolNewId: string, flags: Record<TFeatureFlagsEnum, boolean>): Promise<void> {
    const school = await this.schoolRepo.findOneByNewIdOrThrow(schoolNewId, "notFound.school");

    const newFlags = {
      ...school.featureFlags,
      ...flags,
    };

    await this.schoolRepo.updateOneById(school._id, { featureFlags: newFlags });

    schoolDocStore[school._id].featureFlags = newFlags;
  }
}
