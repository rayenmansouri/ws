import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetPaymentTemplateController } from "./getPaymentTemplate.controller";
import { GetPaymentTemplateRouteConfig } from "./getPaymentTemplate.types";
import { getPaymentTemplateValidation } from "./getPaymentTemplate.validation";

registerRoute<GetPaymentTemplateRouteConfig>()({
  path: "/payment-templates/:paymentTemplateId",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getPaymentTemplateValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.PAYMENT_TEMPLATE },
  controller: GetPaymentTemplateController,
  isTransactionEnabled: false,
  platform: "web",
});
