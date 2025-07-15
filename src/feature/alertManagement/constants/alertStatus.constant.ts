export const ALERT_STATUS_ENUM = {
  DRAFT: "draft",
  SENT: "sent",
  SCHEDULED: "scheduled",
} as const;
export type TAlertStatusEnum = (typeof ALERT_STATUS_ENUM)[keyof typeof ALERT_STATUS_ENUM];

export const MINIMUM_USERS_ALLOWED = 1;
