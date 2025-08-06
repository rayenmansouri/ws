import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import logger from "../../../core/Logger";
import { IEmail } from "../emails/email.interface";
import { Organization } from "../../organization-magement/domain/organization.entity";

@injectable()
export abstract class EmailManager {
  constructor(@inject("Organization") private school: Organization) {}

  protected abstract baseSendEmail(template: IEmail, receiverEmail: string): Promise<void>;

  async sendEmail(template: IEmail, receiverEmail: string): Promise<void> {
    try {
      if (this.school.enableEmail) await this.baseSendEmail(template, receiverEmail);
    } catch (error) {
      logger.error(String(error));
      throw error;
    }
  }
}
