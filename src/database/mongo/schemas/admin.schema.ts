import { AdminMetaData } from "./../../../feature/admins/domain/admin.entity";
import { FileUploadPayload } from "../../../shared/domain/FileManager";
import { fileSchema } from "../../../types/entities";
import { createMongoSchema } from "../createSchema";

export const mongoAdminSchema = createMongoSchema<AdminMetaData["entity"]>({
  firstName: String,
  lastName: String,
  avatar: fileSchema,
  isImpersonation: Boolean,
});
