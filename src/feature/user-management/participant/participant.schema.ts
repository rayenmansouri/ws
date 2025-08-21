import { createCompleteSchema } from "../../../core/database/schema";
import { BaseParticipant } from "./base-participant.entity";
import { Schema } from "mongoose";
import { SeekingGradeParticipant } from "./enums";

export const participantSchema = createCompleteSchema<BaseParticipant>({
  name: "participants",
  schemaDefinition: new Schema<BaseParticipant>({
    seekingGrade: { type: String, required: true, enum: SeekingGradeParticipant },
  },{ timestamps: true })
});