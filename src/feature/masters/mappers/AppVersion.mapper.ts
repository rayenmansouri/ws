import { AppVersion } from "./../domain/AppVersion.entity";
import { AppVersionDto } from "./../dtos/appVersion.dto";

export class AppVersionMapper {
  static toAppVersionDTO({
    android,
    ios,
  }: {
    android: AppVersion;
    ios: AppVersion;
  }): AppVersionDto {
    return {
      android: android.version,
      ios: ios.version,
    };
  }
}
