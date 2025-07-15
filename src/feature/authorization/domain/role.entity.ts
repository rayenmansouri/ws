import { TEndUserEnum } from "../../../constants/globalEnums";
import { GenerateMetaData } from "../../../core/populateTypes";
import { TLanguageEnum } from "../../../translation/constants";
import { BaseEntity } from "../../../types/BaseEntity";

export const SUPER_ADMIN_ROLE = "super-admin";

export type Role = {
  name: string;
  permissions: string[];
  userTypes: TEndUserEnum[];
  translation: Record<TLanguageEnum, string>;
} & BaseEntity;

export type RoleMetaData = GenerateMetaData<Role, never>;
