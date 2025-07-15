export const ALERT_TYPE_ENUM = {
  sms: "sms",
  notification: "notification",
} as const;
export type TAlertTypeEnum = (typeof ALERT_TYPE_ENUM)[keyof typeof ALERT_TYPE_ENUM];
