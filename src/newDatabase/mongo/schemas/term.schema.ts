import { Term } from "../../../feature/terms/domains/term.entity";
import { createMongoSchema } from "../createSchema";

export const mongoTermSchema = createMongoSchema<Term>({
  name: { type: String },
  coefficient: { type: Number },
});
