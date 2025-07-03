import { SubjectType } from "../../../feature/subjectTypes/domains/subjectType.entity";
import { createMongoSchema } from "../createSchema";

export const mongoSubjectTypeSchema = createMongoSchema<SubjectType>({
  name: String,
  preferredStartingHours: [{ type: Number }],
  illustration: String,
});
