import { FileDetails } from "../../../core/fileManager/FileManager";
import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity, ID } from "../../../types/BaseEntity";
import { Role } from "../../authorization/domain/role.entity";

export const defaultAvatar =
  "https://res.cloudinary.com/dfjh0nqb8/image/upload/v1685525139/default_1_tjknpf.svg";

export type BaseUser = {
  firstName: string;
  lastName: string;
  avatar: FileDetails;
  fullName: string;
  gender: TGenderEnum;
  address1: string | null;
  address2: string | null;
  phoneNumber: string | null;
  birthDate: Date | null;
  email: string | null;
  password: string;
  passwordChangedAt: Date | null;
  roles: ID[];
  isArchived: boolean;
  archivedAt: Date | null;
  isActive: boolean;
} & BaseEntity;

export type BaseUserMetaData = GenerateMetaData<
  BaseUser,
  {
    roles: Role[];
  }
>;

export const USER_TYPE_ENUM = {
  admin: "admin",
  teacher: "teacher",
  parent: "parent",
  student: "student",
} as const;
export type TUserTypeEnum = (typeof USER_TYPE_ENUM)[keyof typeof USER_TYPE_ENUM];

export const GENDER_ENUM = {
  MALE: "male",
  FEMALE: "female",
} as const;
export type TGenderEnum = (typeof GENDER_ENUM)[keyof typeof GENDER_ENUM];
