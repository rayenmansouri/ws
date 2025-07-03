import { injectable } from "inversify";
import { Connection, Model } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { InternalError } from "../../../core/ApplicationErrors";
import {
  APP_PLATFORM_ENUM,
  AppVersion,
  TAppPlatformEnum,
} from "../../../feature/masters/domain/AppVersion.entity";
import { AppVersionRepo } from "../../../feature/masters/domain/AppVersion.repo";

@injectable()
export class MongoAppVersionRepo implements AppVersionRepo {
  private model: Model<AppVersion>;

  constructor(@inject("MasterConnection") connection: Connection) {
    this.model = connection.model("appVersion") as Model<AppVersion>;
  }

  async findAndroidVersionOrThrow(): Promise<AppVersion> {
    const androidVersion = await this.model.findOne({ os: APP_PLATFORM_ENUM.ANDROID });

    if (!androidVersion) throw new InternalError("global.internalError");

    return androidVersion;
  }

  async findIosVersionOrThrow(): Promise<AppVersion> {
    const iosVersion = await this.model.findOne({ os: APP_PLATFORM_ENUM.IOS });

    if (!iosVersion) throw new InternalError("global.internalError");

    return iosVersion;
  }

  async updateVersions(payload: Partial<Record<TAppPlatformEnum, string>>): Promise<void> {
    for (const [os, version] of Object.entries(payload)) {
      await this.model.updateOne({ os }, { $set: { version } });
    }
  }
}
