import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdatePaymentTemplateController } from "./updatePaymentTemplate.controller";
import { UpdatePaymentTemplateRouteConfig } from "./updatePaymentTemplate.types";
import { updatePaymentTemplateValidation } from "./updatePaymentTemplate.validation";

registerRoute<UpdatePaymentTemplateRouteConfig>()({
  path: "/payment-templates/:paymentTemplateId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updatePaymentTemplateValidation.body,
  paramSchema: updatePaymentTemplateValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.PAYMENT_TEMPLATE },
  controller: UpdatePaymentTemplateController,
  isTransactionEnabled: false,
  platform: "web",
});
