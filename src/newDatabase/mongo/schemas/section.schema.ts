import { Types } from "mongoose";
import { Section } from "../../../feature/sections/domain/section.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSectionSchema = createMongoSchema<Section>({
  name: String,
  subLevels: [{ type: Types.ObjectId, ref: "subLevel" }],
});
