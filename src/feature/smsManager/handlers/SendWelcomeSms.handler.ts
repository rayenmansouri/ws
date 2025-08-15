import { Handler } from "../../../core/container/decorators/Handler.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { EventHandler } from "../../../core/domainEvents/EventHandler";
import { NewUserAddedEvent } from "../../users/domain/NewUserAdded.event";
import { SmsManager } from "../domain/SmsManager";
import { DownloadAppSms } from "../sms/DownloadAppSms";
import { WelcomeSms } from "../sms/WelcomeSms";
import { OrganizationRepository } from "../../organization-magement/domain/organization.repo";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../organization-magement/constant";

@Handler()
export class SendWelcomeSmsHandler implements EventHandler<NewUserAddedEvent> {
  constructor(
    @inject("SmsManager") private smsManager: SmsManager,
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
  ) {}

  async handle(event: NewUserAddedEvent): Promise<void> {
    if (!event.user.phoneNumber) return;

    const organization = await this.organizationRepo.findOne({ subdomain: event.schoolSubdomain });
    if (!organization) return;

    const welcomeAboardSms = new WelcomeSms({
      schoolName: organization.name,
      phoneNumber: event.user.phoneNumber,
      password: event.password,
    });

    await this.smsManager.sendSms(welcomeAboardSms, event.user.phoneNumber, organization.enableSms);

    const downloadAppSms = new DownloadAppSms();
    await this.smsManager.sendSms(downloadAppSms, event.user.phoneNumber, organization.enableSms);
  }
}
