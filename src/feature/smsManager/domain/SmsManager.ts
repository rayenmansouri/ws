import { injectable } from "inversify";
import { inject } from "../../../core/container/TypedContainer";
import logger from "../../../core/Logger";
import { ISms } from "../sms/sms.interface";
import { Organization } from "../../organization-magement/domain/organization.entity";

@injectable()
export abstract class SmsManager {
  constructor(@inject("Organization") private school: Organization) {}

  protected abstract baseSendSms(message: string, receiverPhoneNumber: string): Promise<void>;

  async sendSms(sms: ISms, receiverPhoneNumber: string): Promise<void> {
    const message = sms.generateMessage();

    if (!SmsManager.isValidLengthSms(message)) {
      logger.warn(`SMS message is long : ${message} `);
      return;
    }

    if (this.school.enableSms === false) return;

    try {
      await this.baseSendSms(message, receiverPhoneNumber);
    } catch (error) {
      logger.error(String(error));
    }
  }

  static isValidLengthSms(text: string): boolean {
    const GSM_7_BASIC =
      "@£$¥èéùìòÇ\nØø\rÅåΔ_ΦΓΛΩΠΨΣΘΞ " +
      "ÆæßÉ !\"#¤%&'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿" +
      "abcdefghijklmnopqrstuvwxyzäöñüà";

    const encoding = [...text].every(char => GSM_7_BASIC.includes(char)) ? "GSM-7" : "UCS-2";

    const MAX_SMS_LENGTH = encoding === "GSM-7" ? 158 : 68;

    return text.length <= MAX_SMS_LENGTH;
  }
}
