import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ObservationRepo } from "../../observations/domain/Observation.repo";
import { ObservationReasonRepo } from "../domains/ObservationReason.repo";
import { TObservationUrgencyEnum } from "../domains/observationReason.entity";

@injectable()
export class UpdateObservationReasonUseCase {
  constructor(
    @inject("ObservationReasonRepo") private observationReasonRepo: ObservationReasonRepo,
    @inject("ObservationRepo") private observationRepo: ObservationRepo,
  ) {}

  async execute(
    observationReasonNewId: string,
    data: Partial<{
      urgency: TObservationUrgencyEnum;
      name: string;
    }>,
  ): Promise<void> {
    const observationReason = await this.observationReasonRepo.findOneByNewIdOrThrow(
      observationReasonNewId,
      "notFound.observationReason",
    );

    await this.observationReasonRepo.updateOneById(observationReason._id, data);

    const newObservationReason = { ...observationReason, ...data };

    await this.observationRepo.updateManyByObservationReason(observationReason._id, {
      observationReason: newObservationReason,
    });
  }
}
