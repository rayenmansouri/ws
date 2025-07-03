import { injectable } from "inversify";
import { ClientSession, Connection } from "mongoose";
import { inject } from "../../../core/container/TypedContainer";
import { NotificationSettingsMetaData } from "../../../feature/notifications/NotificationSettings.entity";
import { NotificationSettingsRepo } from "../../../feature/notifications/NotificationSettings.repo";
import { MongoBaseRepo } from "./MongoBase.repo";

@injectable()
export class MongoNotificationSettingsRepo
  extends MongoBaseRepo<NotificationSettingsMetaData>
  implements NotificationSettingsRepo
{
  constructor(
    @inject("Connection") connection: Connection,
    @inject("Session") session: ClientSession | null,
  ) {
    super(connection, "notificationSettings", session);
  }

  async removeRegistrationToken(userId: string, token: string): Promise<void> {
    await this.model.updateOne(
      { userId },
      { $pull: { registrationTokens: token } },
      { session: this.session },
    );
  }
}
