import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentPaymentConfigurationController } from "./getStudentPaymentConfiguration.controller";
import { GetStudentPaymentConfigurationRouteConfig } from "./getStudentPaymentConfiguration.types";
import { getStudentPaymentConfigurationValidation } from "./getStudentPaymentConfiguration.validation";

registerRoute<GetStudentPaymentConfigurationRouteConfig>()({
  path: "/students/:studentNewId/payment-configuration",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getStudentPaymentConfigurationValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.PAYMENT_CONFIGURATION },
  controller: GetStudentPaymentConfigurationController,
  isTransactionEnabled: false,
  platform: "web",
});
