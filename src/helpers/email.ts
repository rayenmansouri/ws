import nodemailer, { TransportOptions } from "nodemailer";
import { emailService } from "../config";
import Logger from "../core/Logger";
import { organizationDocStore } from "./../core/subdomainStore";

interface EmailOptions {
  email: string | undefined;
  subject: string;
  message: string;
  template?: string;
  verificationCode?: string;
}

export const sendEmailService = async (options: EmailOptions, tenantId: string) => {
  const transporter = nodemailer.createTransport({
    host: emailService.host,
    port: emailService.port,
    auth: {
      user: emailService.username,
      pass: emailService.password,
    },
  } as TransportOptions);

  const mailOptions = {
    from: { name: "WebSchool", address: emailService.username },
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.template,
  };

  try {
    const isSendEmailEnabled = organizationDocStore[tenantId].enableEmail;
    if (isSendEmailEnabled) await transporter.sendMail(mailOptions);
  } catch (error) {
    Logger.error(String(error));
  } finally {
    return;
  }
};
