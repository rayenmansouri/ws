import { SubLevel } from "../../../feature/subLevels/domains/subLevel.entity";
import { createMongoSchema } from "../createSchema";
import { mongoLevelSchema } from "./level.schema";

export const mongoSubLevelSchema = createMongoSchema<SubLevel>({
  name: String,
  level: mongoLevelSchema,
  hasSections: Boolean,
  rank: Number,
});
