
import { Counter } from "../../../feature/counter/domain/counter.entity";
import { createMongoSchema } from "../createSchema";

export const mongoCounterSchema = createMongoSchema<Counter>({});
  