import { ISms } from "./sms.interface";

export class DownloadAppSms implements ISms {
  constructor() {}

  generateMessage(): string {
    return `Téléchargez dès maintenant l’application WebSchool: 
    android: https://softy.link/ws-android
    ios: https://softy.link/ws-ios`;
  }
}
