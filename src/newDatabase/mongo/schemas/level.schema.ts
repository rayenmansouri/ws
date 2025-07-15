import { Level } from "../../../feature/levels/domains/level.entity";
import { createMongoSchema } from "../createSchema";
import { mongoSchoolYearSchema } from "./schoolYear.schema";

export const mongoLevelSchema = createMongoSchema<Level>({
  color: String,
  name: String,
  rank: Number,
  currentSchoolYear: mongoSchoolYearSchema,
  establishmentTitle: String,
  examGradeSystem: String,
});
