import { injectable } from "inversify";
import { School } from "../../schools/domain/school.entity";
import { inject } from "../../../core/container/TypedContainer";
import logger from "../../../core/Logger";
import { IEmail } from "../emails/email.interface";

@injectable()
export abstract class EmailManager {
  constructor(@inject("School") private school: School) {}

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
