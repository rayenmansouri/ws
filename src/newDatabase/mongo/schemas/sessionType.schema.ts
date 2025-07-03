import { SessionType } from "../../../feature/sessionTypes/domains/sessionType.entity";
import { createMongoSchema } from "./../createSchema";

export const mongoSessionTypeSchema = createMongoSchema<SessionType>({
  name: { type: String },
});
