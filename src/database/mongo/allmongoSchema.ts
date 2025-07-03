import { mongoAdminSchema } from "./../mongo/schemas/admin.schema";
import { mongoCounterSchema } from "./../mongo/schemas/counter.schema";

export const allMongoSchemas = {
  admin: mongoAdminSchema,
  counter: mongoCounterSchema,
} as const;
