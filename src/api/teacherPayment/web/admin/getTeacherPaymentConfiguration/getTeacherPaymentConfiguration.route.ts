import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetTeacherPaymentConfigurationController } from "./getTeacherPaymentConfiguration.controller";
import { GetTeacherPaymentConfigurationRouteConfig } from "./getTeacherPaymentConfiguration.types";
import { getTeacherPaymentConfigurationValidation } from "./getTeacherPaymentConfiguration.validation";

registerRoute<GetTeacherPaymentConfigurationRouteConfig>()({
  path: "/teachers/:teacherNewId/payment-configuration/details",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getTeacherPaymentConfigurationValidation.params,
  authorization: {
    action: ACTION_ENUM.VIEW,
    resource: RESOURCES_ENUM.TEACHER_PAYMENT_CONFIGURATION,
  },
  controller: GetTeacherPaymentConfigurationController,
  isTransactionEnabled: false,
  platform: "web",
});
