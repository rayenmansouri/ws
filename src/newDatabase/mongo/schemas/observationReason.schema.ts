import { ObservationReason } from "../../../feature/observationsReason/domains/observationReason.entity";
import { createMongoSchema } from "../createSchema";

export const mongoObservationReasonSchema = createMongoSchema<ObservationReason>({
  name: String,
  urgency: String,
});
