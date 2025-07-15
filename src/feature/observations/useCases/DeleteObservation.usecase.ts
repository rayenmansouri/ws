import { injectable } from "inversify/lib/inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ID } from "../../../types/BaseEntity";
import { ObservationRepo } from "../domain/Observation.repo";
import { END_USER_ENUM } from "../../../constants/globalEnums";
import { ForbiddenError } from "../../../core/ApplicationErrors";

type DeleteObservationUseCaseData = {
  observationNewId: string;
  userId: ID;
  userType: "admin" | "teacher";
};

@injectable()
export class DeleteObservationUseCase {
  constructor(
    @inject("ObservationRepo") private observationRepo: ObservationRepo, // Replace with actual type
  ) {}

  async execute(params: DeleteObservationUseCaseData): Promise<void> {
    const { observationNewId, userId, userType } = params;

    const observation = await this.observationRepo.findOneByNewIdOrThrow(
      observationNewId,
      "notFound.observation",
    );

    if (userType === END_USER_ENUM.TEACHER && observation.issuer != userId) {
      throw new ForbiddenError("global.accessDenied");
    }

    await this.observationRepo.deleteOneByNewId(observationNewId);

    return;
  }
}
