import { ObservationReason } from "../domains/observationReason.entity";
import { ObservationReasonDTO } from "../dtos/observationReason.dto";

export class ObservationReasonMapper {
  static toDTO(observationReason: ObservationReason): ObservationReasonDTO {
    return {
      _id: observationReason._id,
      newId: observationReason.newId,
      name: observationReason.name,
      urgency: observationReason.urgency,
    };
  }
}
