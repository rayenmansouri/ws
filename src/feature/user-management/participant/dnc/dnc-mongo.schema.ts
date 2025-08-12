import { createCompleteSchema } from "../../../../core/database/schema";
import { dncType } from "./dnc.entity";

export const dncMongoSchema = createCompleteSchema<dncType>({
  name: "dnc",
  schemaDefinition: {
    sex: { type: String, required: true },
  },
  options: {
    timestamps: true,
  },
});