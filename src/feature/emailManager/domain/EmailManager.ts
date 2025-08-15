import { injectable } from "inversify";
import Logger from "../../../core/Logger";
import { IEmail } from "../emails/email.interface";


@injectable()
export abstract class EmailManager {
  protected abstract baseSendEmail(template: IEmail, receiverEmail: string): Promise<void>;

  async sendEmail(template: IEmail, receiverEmail: string, enableEmail: boolean = true): Promise<void> {
    try {
      if (enableEmail) await this.baseSendEmail(template, receiverEmail);
    } catch (error) {
      Logger.error("error sending email");
      Logger.error(String(error));
      throw error;
    }
  }
}
