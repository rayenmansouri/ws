import { TLanguageEnum } from "../../../translation/constants";
import { ID } from "../../../types/BaseEntity";

export type RoleDTO = {
  _id: ID;
  newId: string;
  name: string;
  permissions: string[];
  userTypes: string[];
  translation: Record<TLanguageEnum, string>;
};
