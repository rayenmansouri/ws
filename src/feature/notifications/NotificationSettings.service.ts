import { injectable } from "inversify";
import { inject } from "../../core/container/TypedContainer";
import { NotificationSettings } from "./NotificationSettings.entity";
import { NotificationSettingsRepo } from "./NotificationSettings.repo";
import { ID } from "../../types/BaseEntity";

@injectable()
export class NotificationSettingsService {
  constructor(
    @inject("NotificationSettingsRepo") private notificationSettingsRepo: NotificationSettingsRepo,
  ) {}

  async addNotificationSettings(userId: ID): Promise<NotificationSettings> {
    const notificationSettings = await this.notificationSettingsRepo.addOne({
      userId,
      isPushNotificationEnabled: true,
      preferences: {
        attendance: true,
        homework: true,
        informations: true,
        messages: true,
        observations: true,
        payment: true,
        schedule: true,
      },
      registrationTokens: [],
    });

    return notificationSettings;
  }
}
