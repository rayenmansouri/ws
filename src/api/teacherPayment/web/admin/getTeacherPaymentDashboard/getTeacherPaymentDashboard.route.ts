import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetTeacherPaymentDashboardController } from "./getTeacherPaymentDashboard.controller";
import { GetTeacherPaymentDashboardRouteConfig } from "./getTeacherPaymentDashboard.types";
import { getTeacherPaymentDashboardValidation } from "./getTeacherPaymentDashboard.validation";

registerRoute<GetTeacherPaymentDashboardRouteConfig>()({
  path: "/teachers/:teacherNewId/payment/dashboard",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getTeacherPaymentDashboardValidation.query,
  paramSchema: getTeacherPaymentDashboardValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.TEACHER_PAYMENT },
  controller: GetTeacherPaymentDashboardController,
  isTransactionEnabled: false,
  platform: "web",
});
