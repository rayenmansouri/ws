import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddTeacherPaymentConfigurationController } from "./addTeacherPaymentConfiguration.controller";
import { AddTeacherPaymentConfigurationRouteConfig } from "./addTeacherPaymentConfiguration.types";
import { addTeacherPaymentConfigurationValidation } from "./addTeacherPaymentConfiguration.validation";

registerRoute<AddTeacherPaymentConfigurationRouteConfig>()({
  path: "/teachers/:teacherNewId/payment-configuration",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addTeacherPaymentConfigurationValidation.body,
  paramSchema: addTeacherPaymentConfigurationValidation.params,
  authorization: {
    action: ACTION_ENUM.ADD,
    resource: RESOURCES_ENUM.TEACHER_PAYMENT_CONFIGURATION,
  },
  controller: AddTeacherPaymentConfigurationController,
  isTransactionEnabled: false,
  platform: "web",
  upload: { fields: [{ name: "attachment", maxCount: 10 }] },
});
