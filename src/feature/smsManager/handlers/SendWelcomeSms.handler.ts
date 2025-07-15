import { Handler } from "../../../core/container/decorators/Handler.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { EventHandler } from "../../../core/domainEvents/EventHandler";
import { School } from "../../schools/domain/school.entity";
import { NewUserAddedEvent } from "../../users/domain/NewUserAdded.event";
import { SmsManager } from "../domain/SmsManager";
import { DownloadAppSms } from "../sms/DownloadAppSms";
import { WelcomeSms } from "../sms/WelcomeSms";

@Handler()
export class SendWelcomeSmsHandler implements EventHandler<NewUserAddedEvent> {
  constructor(
    @inject("SmsManager") private smsManager: SmsManager,
    @inject("School") private school: School,
  ) {}

  async handle(event: NewUserAddedEvent): Promise<void> {
    if (!event.user.phoneNumber) return;

    const welcomeAboardSms = new WelcomeSms({
      schoolName: this.school.name,
      phoneNumber: event.user.phoneNumber,
      password: event.password,
    });

    await this.smsManager.sendSms(welcomeAboardSms, event.user.phoneNumber);

    const downloadAppSms = new DownloadAppSms();
    await this.smsManager.sendSms(downloadAppSms, event.user.phoneNumber);
  }
}
