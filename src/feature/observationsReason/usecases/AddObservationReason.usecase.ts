import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { ObservationReasonRepo } from "../domains/ObservationReason.repo";
import { TObservationUrgencyEnum } from "../domains/observationReason.entity";

@injectable()
export class AddObservationReasonUsecase {
  constructor(
    @inject("ObservationReasonRepo") private observationReasonRepo: ObservationReasonRepo,
  ) {}

  async execute(data: { name: string; urgency: TObservationUrgencyEnum }): Promise<void> {
    await this.observationReasonRepo.ensureFieldUniqueness("name", data.name, "alreadyUsed.name");
    await this.observationReasonRepo.addOne(data);
  }
}
