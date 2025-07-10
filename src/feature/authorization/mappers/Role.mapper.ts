import { TEndUserEnum } from "./../../../constants/globalEnums";
import { BasePersistence } from "./../../../shared/domain/basePersistence";
import { Role } from "../domain/role.entity";
import { RoleDTO } from "../dtos/Role.dto";
import { ID } from "./../../../shared/value-objects/ID.vo";

export interface RolePersistence extends BasePersistence {
  name: string;
  permissions: string[];
  userTypes: TEndUserEnum[];
  translation: Record<string, string>;
}

export class RoleMapper {
  static toRoleDTO(role: Role): RoleDTO {
    return {
      _id: role.id,
      newId: role.newId,
      name: role.name,
      permissions: role.permissions,
      userTypes: role.userTypes,
      translation: role.translation,
    };
  }
  static toDomain(role: RolePersistence): Role {
    return new Role({
      id: ID.create(role._id),
      newId: role.newId,
      createdAt: role.createdAt,
      updatedAt: role.updatedAt,
      name: role.name,
      permissions: role.permissions,
      userTypes: role.userTypes,
      translation: role.translation,
    });
  }
}
