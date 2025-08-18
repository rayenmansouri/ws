import { createCompleteSchema } from "../../../../core/database/schema";
import { dncType } from "./dnc.entity";

export const dncMongoSchema = createCompleteSchema<dncType>({
  name: "dnc",
  schemaDefinition: {
    uniqueId: { type: String, required: true },
    address1: { type: String, required: false },
    address2: { type: String, required: false },
    parents: { type: [String], required: false },
    level: { type: String, required: false },
    classType: { type: String, required: false },
    DNC: { type: String, required: true },
  },
  options: {
    timestamps: true,
  },
});