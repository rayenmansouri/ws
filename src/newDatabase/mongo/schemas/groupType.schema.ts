import { GroupType } from "../../../feature/groupManagement/domains/groupType.entity";
import { createMongoSchema } from "../createSchema";

export const mongoGroupTypeSchema = createMongoSchema<GroupType>({
  name: String,
  illustration: String,
  coefficient: Number,
});
