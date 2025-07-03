import { GetAlertStatisticsValidation } from "./getAlertStatistics.validation";

export type GetAlertStatisticsRouteConfig = GetAlertStatisticsValidation & { files: never };
export type GetAlertStatisticsResponse = {
  totalSms: number;
  totalNotifications: number;
  remainingSmsSold: number;
  smsSentCount: number;
  notificationSentCount: number;
  smsDraftedCount: number;
  notificationDraftedCount: number;
  smsScheduledCount: number;
  notificationScheduledCount: number;
};
