// Basic notification settings entity stub
export interface NotificationSettings {
  id: string;
  userId: string;
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  registrationTokens: Array<{ token: string; userAgent: string }>;
}

export class NotificationSettingsEntity {
  public id: string;
  public userId: string;
  public emailEnabled: boolean;
  public smsEnabled: boolean;
  public pushEnabled: boolean;
  public registrationTokens: Array<{ token: string; userAgent: string }>;

  constructor(data: any) {
    this.id = data.id;
    this.userId = data.userId;
    this.emailEnabled = data.emailEnabled;
    this.smsEnabled = data.smsEnabled;
    this.pushEnabled = data.pushEnabled;
    this.registrationTokens = data.registrationTokens || [];
  }
}