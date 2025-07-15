import { getTeacherPaymentDashboardResponse } from "./../../../../../feature/teacherPayment/types/responses.types";
import { GetTeacherPaymentDashboardValidation } from "./getTeacherPaymentDashboard.validation";

export type GetTeacherPaymentDashboardRouteConfig = GetTeacherPaymentDashboardValidation & {
  files: never;
};
export type GetTeacherPaymentDashboardResponse = getTeacherPaymentDashboardResponse;
