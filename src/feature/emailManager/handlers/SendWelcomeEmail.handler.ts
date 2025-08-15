import { Handler } from "../../../core/container/decorators/Handler.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { EventHandler } from "../../../core/domainEvents/EventHandler";
import { EmailManager } from "../domain/EmailManager";
import { WelcomeAboardEmail } from "../emails/WelcomeAboardEmail";
import { OrganizationRepository } from "../../organization-magement/domain/organization.repo";
import { ORGANIZATION_REPOSITORY_IDENTIFIER } from "../../organization-magement/constant";
import { NewUserAddedEvent } from "../../users/domain/NewUserAdded.event";

@Handler()
export class SendWelcomeEmailHandler implements EventHandler<NewUserAddedEvent> {
  constructor(
    @inject("EmailManager") private emailManager: EmailManager,
    @inject(ORGANIZATION_REPOSITORY_IDENTIFIER) private organizationRepo: OrganizationRepository,
  ) {}

  async handle(event: NewUserAddedEvent): Promise<void> {
    if (!event.user.email) return;

    const organization = await this.organizationRepo.findOne({ subdomain: event.schoolSubdomain });
    if (!organization) return;

    const welcomeAboardEmail = new WelcomeAboardEmail({
      email: event.user.email,
      fullName: event.user.fullName,
      userType: event.userType,
      schoolAddress: organization.address || "-",
      schoolEmail: organization.email || "-",
      schoolPhone: organization.phoneNumber || "-",
      schoolSubdomain: organization.subdomain,
      password: event.password,
    });

    await this.emailManager.sendEmail(welcomeAboardEmail, event.user.email, organization.enableEmail);
  }
}
