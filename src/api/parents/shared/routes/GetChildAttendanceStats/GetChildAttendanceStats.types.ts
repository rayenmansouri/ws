import { AttendanceDashboardStats } from "./../../../../../feature/sessionManagement/applicationServices/Session.application.service";

import { GetChildAttendanceStatsValidation } from "./GetChildAttendanceStats.validation";

export type GetChildAttendanceStatsRouteConfig = GetChildAttendanceStatsValidation & {
  files: never;
};
export type GetChildAttendanceStatsResponse = AttendanceDashboardStats;
