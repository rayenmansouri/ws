import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ObservationReasonRepo } from "../domains/ObservationReason.repo";
import { ObservationRepo } from "../../observations/domain/Observation.repo";
import { BadRequestError } from "../../../core/ApplicationErrors";

@injectable()
export class DeleteObservationReasonUseCase {
  constructor(
    @inject("ObservationReasonRepo") private observationReasonRepo: ObservationReasonRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
  ) {}

  async execute(observationReasonNewId: string): Promise<void> {
    const observationReason = await this.observationReasonRepo.findOneByNewIdOrThrow(
      observationReasonNewId,
      "notFound.observationReason",
    );

    const observations = await this.observationRepo.findManyByObservationReason(
      observationReason._id,
    );

    if (observations.length) throw new BadRequestError("observationReason.IsUsed");

    await this.observationReasonRepo.deleteOneById(observationReason._id);
  }
}
