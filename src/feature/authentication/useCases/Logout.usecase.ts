import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import { NotificationSettingsRepo } from "../../notifications/NotificationSettings.repo";
import { ID } from "../../../types/BaseEntity";

type TLogoutRequest = {
  userId: ID;
  userAgent: string | undefined;
};

@injectable()
export class LogoutUseCase {
  constructor(
    @inject("NotificationSettingsRepo") private notificationSettingsRepo: NotificationSettingsRepo,
  ) {}

  async execute(data: TLogoutRequest): Promise<void> {
    if (!data.userAgent) return;

    await this.notificationSettingsRepo.removeRegistrationToken(data.userId, data.userAgent);
  }
}
