import { fileSchema } from "../../../types/entities";
import { createMongoSchema } from "../createSchema";
import { AdminMetaData } from "./../../../feature/admins/domain/admin.entity";

export const mongoAdminSchema = createMongoSchema<AdminMetaData["entity"]>({
  firstName: String,
  lastName: String,
  avatar: fileSchema,
  isActive: Boolean,
});
