export interface INotificationBase {
  title?: string;
  body?: string;
  imageUrl?: string;
  data?: Record<string, any>;
}
export interface IUserNotificationData {
  userId: string;
  image?: string;
}
export interface INotificationPayload {
  tokens: string[];
  notification: INotificationBase | undefined;
  image?: string;
}
export interface IPreferences {
  homework: boolean;
  payment: boolean;
  observations: boolean;
  schedule: boolean;
}
export interface INotificationSettingsPayload {
  isPushNotificationEnabled: boolean;
  isSmsNotificationEnabled: boolean;
  isEmailNotificationEnabled: boolean;
  preferences: IPreferences;
}
