import { createCompleteSchema } from "../../../../core/database/schema";
import { Schema } from "mongoose";
import { dncNotGradeSeekingType } from "./dnc.entity";

export const dncNotGradeSeekingMongoSchema = createCompleteSchema<dncNotGradeSeekingType>({
  name: "dncNotGradeSeeking",
  schemaDefinition: new Schema<dncNotGradeSeekingType>({
    uniqueId: { type: String, required: true },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    parents: { type: [String], required: false },
    level: { type: String, required: false },
    classType: { type: String, required: false },
    DNC: { type: String, required: true },
  },{ timestamps: true })
});