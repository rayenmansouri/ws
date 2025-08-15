import { injectable } from "inversify";
import Logger from "../../../core/Logger";
import { ISms } from "../sms/sms.interface";

@injectable()
export abstract class SmsManager {
  protected abstract baseSendSms(message: string, receiverPhoneNumber: string): Promise<void>;

  async sendSms(sms: ISms, receiverPhoneNumber: string, enableSms: boolean = true): Promise<void> {
    const message = sms.generateMessage();

    if (!SmsManager.isValidLengthSms(message)) {
      Logger.warn(`SMS message is long : ${message} `);
      return;
    }

    if (!enableSms) return;

    try {
      await this.baseSendSms(message, receiverPhoneNumber);
    } catch (error) {
      Logger.error(String(error));
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
