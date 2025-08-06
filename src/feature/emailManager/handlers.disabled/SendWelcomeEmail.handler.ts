import { Handler } from "../../../core/container/decorators/Handler.decorator";
import { inject } from "../../../core/container/TypedContainer";
import { EventHandler } from "../../../core/domainEvents/EventHandler";
import { School } from "../../schools/domain/school.entity";
import { NewUserAddedEvent } from "../../users/domain/NewUserAdded.event";
import { EmailManager } from "../domain/EmailManager";
import { WelcomeAboardEmail } from "../emails/WelcomeAboardEmail";

@Handler()
export class SendWelcomeEmailHandler implements EventHandler<NewUserAddedEvent> {
  constructor(
    @inject("EmailManager") private emailManager: EmailManager,
    @inject("School") private school: School,
  ) {}

  async handle(event: NewUserAddedEvent): Promise<void> {
    if (!event.user.email) return;

    const welcomeAboardEmail = new WelcomeAboardEmail({
      email: event.user.email,
      fullName: event.user.fullName,
      userType: event.userType,
      schoolAddress: this.school.address || "-",
      schoolEmail: this.school.email || "-",
      schoolPhone: this.school.phoneNumber || "-",
      schoolSubdomain: this.school.subdomain,
      password: event.password,
    });

    await this.emailManager.sendEmail(welcomeAboardEmail, event.user.email);
  }
}
