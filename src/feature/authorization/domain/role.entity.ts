import { Guard } from "./../../../shared/utils/Guards";
import { ID } from "./../../../shared/value-objects/ID.vo";
import { TEndUserEnum } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { TLanguageEnum } from "../../../translation/constants";
import { BaseEntity } from "../../../shared/domain/baseEntity";

export const SUPER_ADMIN_ROLE = "super-admin";

export class Role extends BaseEntity {
  name: string;
  permissions: string[];
  userTypes: TEndUserEnum[];
  translation: Record<TLanguageEnum, string>;

  constructor(params: {
    id: ID;
    newId: string;
    createdAt?: Date;
    updatedAt?: Date;
    name: string;
    permissions: string[];
    userTypes: TEndUserEnum[];
    translation: Record<TLanguageEnum, string>;
  }) {
    super(params);
    Guard.againstEmptyString(params.name, "Invalid name");
    Guard.againstEmptyArray(params.permissions, "Invalid permissions");
    Guard.againstEmptyArray(params.userTypes, "Invalid user types");
    Guard.againstEmptyObject(params.translation, "Invalid translation");
    this.name = params.name;
    this.permissions = params.permissions;
    this.userTypes = params.userTypes;
    this.translation = params.translation;
  }
}

export type RoleMetaData = GenerateMetaData<Role, never>;
