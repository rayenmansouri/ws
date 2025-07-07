import { GenerateMetaData } from "../../../core/populateTypes";
import { BaseEntity } from "../../../shared/domain/baseEntity";

export const APP_PLATFORM_ENUM = {
  ANDROID: "android",
  IOS: "ios",
} as const;
export type TAppPlatformEnum =
  (typeof APP_PLATFORM_ENUM)[keyof typeof APP_PLATFORM_ENUM];

export type AppVersion = {
  version: string;
  os: TAppPlatformEnum;
} & BaseEntity;

export type AppVersionMetaData = GenerateMetaData<AppVersion, never>;
