import { AppVersion, TAppPlatformEnum } from "./AppVersion.entity";

export abstract class AppVersionRepo {
  abstract findAndroidVersionOrThrow(): Promise<AppVersion>;

  abstract findIosVersionOrThrow(): Promise<AppVersion>;

  abstract updateVersions(payload: Partial<Record<TAppPlatformEnum, string>>): Promise<void>;
}
