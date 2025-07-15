import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddPaymentTemplateController } from "./addPaymentTemplate.controller";
import { AddPaymentTemplateRouteConfig } from "./addPaymentTemplate.types";
import { addPaymentTemplateValidation } from "./addPaymentTemplate.validation";

registerRoute<AddPaymentTemplateRouteConfig>()({
  path: "/payment-templates",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addPaymentTemplateValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.PAYMENT_TEMPLATE },
  controller: AddPaymentTemplateController,
  isTransactionEnabled: false,
  platform: "web",
});
