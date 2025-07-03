import { TLanguageEnum } from "../../../translation/constants";
import { Role } from "../../authorization/domain/role.entity";
import { Admin } from "../domain/admin.entity";
import { AdminDTO } from "../dtos/Admin.dto";

export class AdminMapper {
  static toDTO(admin: Admin, roles: Role[], language: TLanguageEnum): AdminDTO {
    return {
      _id: admin._id,
      newId: admin.newId,
      firstName: admin.firstName,
      lastName: admin.lastName,
      fullName: admin.fullName,
      gender: admin.gender,
      email: admin.email,
      phoneNumber: admin.phoneNumber,
      address1: admin.address1,
      address2: admin.address2,
      avatar: admin.avatar.link,
      birthDate: admin.birthDate,
      roles: roles.map(role => ({
        _id: role._id,
        newId: role.newId,
        name: role.translation[language],
      })),
      isArchived: admin.isArchived,
      isActive: admin.isActive,
    };
  }
}
