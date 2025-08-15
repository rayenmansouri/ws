import { ISms } from "./sms.interface";

export class ForgetPasswordSms implements ISms {
  constructor(private verificationCode: string) {}

  generateMessage(): string {
    return `Votre code de réinitialisation de mot de passe est : ${this.verificationCode}.`;
  }
}
