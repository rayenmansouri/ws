import { injectable } from "inversify";
import nodemailer, { Transporter } from "nodemailer";
import { emailService } from "../../../config";
import { School } from "../../schools/domain/school.entity";
import { inject } from "../../../core/container/TypedContainer";
import { EmailManager } from "../domain/EmailManager";
import { IEmail } from "../emails/email.interface";

@injectable()
export class NodeMailerEmailManager extends EmailManager {
  private transporter: Transporter<unknown>;
  private username: string;

  constructor(@inject("School") school: School) {
    super(school);
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
