import { BaseRepo } from "../../core/BaseRepo";
import { NotificationSettingsMetaData } from "./NotificationSettings.entity";

export abstract class NotificationSettingsRepo extends BaseRepo<NotificationSettingsMetaData> {
  abstract removeRegistrationToken(userId: string, token: string): Promise<void>;
}
