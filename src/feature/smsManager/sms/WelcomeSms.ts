import { ISms } from "./sms.interface";

export class WelcomeSms implements ISms {
  private password: string;
  private schoolName: string;
  private phoneNumber: string;

  constructor({
    password,
    schoolName,
    phoneNumber,
  }: {
    password: string;
    schoolName: string;
    phoneNumber: string;
  }) {
    this.password = password;
    this.schoolName = schoolName;
    this.phoneNumber = phoneNumber;
  }

  generateMessage(): string {
    return `Connectez-vous à ${this.schoolName} avec le téléphone: ${this.phoneNumber} et le mot de passe temporaire: ${this.password}`;
  }
}
