import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateStudentPaymentConfigurationController } from "./updateStudentPaymentConfiguration.controller";
import { UpdateStudentPaymentConfigurationRouteConfig } from "./updateStudentPaymentConfiguration.types";
import { updateStudentPaymentConfigurationValidation } from "./updateStudentPaymentConfiguration.validation";

registerRoute<UpdateStudentPaymentConfigurationRouteConfig>()({
  path: "/students/:studentNewId/payment-configuration",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateStudentPaymentConfigurationValidation.body,
  paramSchema: updateStudentPaymentConfigurationValidation.params,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.PAYMENT_CONFIGURATION },
  controller: UpdateStudentPaymentConfigurationController,
  isTransactionEnabled: true,
  platform: "web",
});
