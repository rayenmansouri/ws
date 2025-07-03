import { omit } from "lodash";
import { PickFromEnum } from "../types/utils/enums.util";

export const END_USER_ENUM = {
  ADMIN: "admin",
  TEACHER: "teacher",
  STUDENT: "student",
  PARENT: "parent",
  MASTER: "master",
} as const;

export const END_USER_WITHOUT_MASTER_ENUM = omit(END_USER_ENUM, "MASTER");
export type TEndUserWithoutMasterEnums =
  (typeof END_USER_WITHOUT_MASTER_ENUM)[keyof typeof END_USER_WITHOUT_MASTER_ENUM];

export type TEndUserEnum = (typeof END_USER_ENUM)[keyof typeof END_USER_ENUM];

export type TEndAdministrationUserEnums = PickFromEnum<TEndUserEnum, "teacher" | "admin">;
