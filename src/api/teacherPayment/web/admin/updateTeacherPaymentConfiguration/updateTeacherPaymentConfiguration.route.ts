import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateTeacherPaymentConfigurationController } from "./updateTeacherPaymentConfiguration.controller";
import { UpdateTeacherPaymentConfigurationRouteConfig } from "./updateTeacherPaymentConfiguration.types";
import { updateTeacherPaymentConfigurationValidation } from "./updateTeacherPaymentConfiguration.validation";

registerRoute<UpdateTeacherPaymentConfigurationRouteConfig>()({
  path: "/teacher/:teacherNewId/payment-configuration",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateTeacherPaymentConfigurationValidation.body,
  paramSchema: updateTeacherPaymentConfigurationValidation.params,
  authorization: {
    action: ACTION_ENUM.EDIT,
    resource: RESOURCES_ENUM.TEACHER_PAYMENT_CONFIGURATION,
  },
  controller: UpdateTeacherPaymentConfigurationController,
  isTransactionEnabled: false,
  platform: "web",
  upload: { fields: [{ name: "attachment" }] },
});
