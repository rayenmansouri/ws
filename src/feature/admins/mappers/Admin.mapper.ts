import { BasePersistence } from "./../../../shared/domain/basePersistence";
import { Admin } from "../domain/admin.entity";
import { ID } from "../../../shared/value-objects/ID.vo";
import { FileUploadPayload } from "../../../shared/domain/FileManager";

export interface AdminPersistence extends BasePersistence {
  firstName: string;
  lastName: string;
  email: string;
  avatar: FileUploadPayload;
  isActive?: boolean;
  passwordChangedAt?: Date | null;
}

export class AdminMapper {
  static toDomain(raw: AdminPersistence): Admin {
    return new Admin({
      id: ID.create(raw._id),
      firstName: raw.firstName,
      lastName: raw.lastName,
      email: raw.email,
      avatar: raw.avatar,
      isActive: raw.isActive ?? true,
      passwordChangedAt: raw.passwordChangedAt ?? null,
    });
  }
}
