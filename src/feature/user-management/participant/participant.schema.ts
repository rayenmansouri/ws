import { createCompleteSchema } from "../../../core/database/schema";
import { BaseParticipant } from "./base-participant.entity";

export const participantSchema = createCompleteSchema<BaseParticipant>({
  name: "participants",
  schemaDefinition: {
    base: { type: String, required: true },
  },
  options: {
    timestamps: true,
  },
});