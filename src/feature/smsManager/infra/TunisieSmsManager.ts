import axios from "axios";
import { tunisieSmsCredentials } from "../../../config";
import { SmsManager } from "../domain/SmsManager";

import { injectable } from "inversify";

const { url, fct, key, prefix, sender } = tunisieSmsCredentials;

@injectable()
export class TunisieSmsManager extends SmsManager {
  protected async baseSendSms(smsContent: string, receiverPhoneNumber: string): Promise<void> {
    await axios.get(`${url}`, {
      params: {
        fct,
        key,
        mobile: prefix + receiverPhoneNumber,
        sms: smsContent,
        sender,
      },
    });
  }
}
