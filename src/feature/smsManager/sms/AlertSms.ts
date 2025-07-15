import { ISms } from "./sms.interface";

export class AlertSms implements ISms {
  constructor(private content: string) {}

  generateMessage(): string {
    return this.content;
  }
}
