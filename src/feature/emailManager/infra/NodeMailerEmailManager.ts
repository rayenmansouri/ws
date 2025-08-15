import nodemailer, { Transporter } from "nodemailer";
import { emailService } from "../../../config";
import { EmailManager } from "../domain/EmailManager";
import { IEmail } from "../emails/email.interface";
import { injectable } from "inversify";

@injectable()
export class NodeMailerEmailManager extends EmailManager {
  private transporter: Transporter<unknown>;
  private username: string;

  constructor() {
    super();
    this.username = emailService.username;
    this.transporter = nodemailer.createTransport({
      host: emailService.host,
      port: +emailService.port,
      auth: {
        user: emailService.username,
        pass: emailService.password,
      },
    });
  }

  protected async baseSendEmail(email: IEmail, receiverEmail: string): Promise<void> {
    const mailOptions = {
      from: { name: "WebSchool", address: this.username },
      to: receiverEmail,
      subject: email.subject,
      text: email.message,
      html: email.html,
    };

    await this.transporter.sendMail(mailOptions);
  }
}
