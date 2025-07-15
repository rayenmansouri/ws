import { Diploma } from "../../../feature/diploma/diploma.entity";
import { createMongoSchema } from "../createSchema";

export const mongoDiplomaSchema = createMongoSchema<Diploma>({
  template: { type: String },
  maxAverage: { type: Number },
  minAverage: { type: Number },
  name: { type: String },
});
