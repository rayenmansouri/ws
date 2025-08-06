import { TLanguageEnum } from "../../../translation/constants";
import { Role } from "../../authorization/domain/role.entity";
import { Admin } from "../domain/admin.entity";
import { AdminDTO } from "../dtos/Admin.dto";

export class AdminMapper {
  static toDTO(admin: Admin, roles: Role[], language: TLanguageEnum): AdminDTO {
    return {
      _id: (admin as any)._id || admin.id,
      newId: (admin as any).newId,
      firstName: admin.firstName,
      lastName: admin.lastName,
      fullName: admin.fullName,
      gender: (admin as any).gender,
      email: admin.email,
      phoneNumber: (admin as any).phoneNumber,
      address1: (admin as any).address1,
      address2: (admin as any).address2,
      avatar: (admin as any).avatar?.link,
      birthDate: (admin as any).birthDate,
      roles: roles.map(role => ({
        _id: (role as any)._id || (role as any).id,
        newId: (role as any).newId,
        name: (role as any).translation?.[language] || (role as any).name,
      })),
      isArchived: (admin as any).isArchived,
      isActive: (admin as any).isActive,
    };
  }
}
