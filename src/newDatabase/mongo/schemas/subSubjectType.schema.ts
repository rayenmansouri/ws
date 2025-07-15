import { SubSubjectType } from "../../../feature/subSubjectTypes/domains/subSubjectType.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSubSubjectTypeSchema = createMongoSchema<SubSubjectType>({
  name: String,
  preferredStartingHours: [{ type: Number }],
  illustration: String,
});
