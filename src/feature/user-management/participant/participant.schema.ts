import { createCompleteSchema } from "../../../core/database/schema";
import { BaseParticipant } from "./base-participant.entity";
import { Schema } from "mongoose";

export const participantSchema = createCompleteSchema<BaseParticipant>({
  name: "participants",
  schemaDefinition: new Schema<BaseParticipant>({
    base: { type: String, required: true },
  },{ timestamps: true })
});