import { Role } from "../domain/role.entity";
import { RoleDTO } from "../dtos/Role.dto";

export class RoleMapper {
  static toRoleDTO(role: Role): RoleDTO {
    return {
      _id: role._id,
      newId: role.newId,
      name: role.name,
      permissions: role.permissions,
      userTypes: role.userTypes,
      translation: role.translation,
    };
  }
}
