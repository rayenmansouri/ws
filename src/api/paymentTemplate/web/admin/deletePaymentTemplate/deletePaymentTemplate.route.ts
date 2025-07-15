import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeletePaymentTemplateController } from "./deletePaymentTemplate.controller";
import { DeletePaymentTemplateRouteConfig } from "./deletePaymentTemplate.types";
import { deletePaymentTemplateValidation } from "./deletePaymentTemplate.validation";

registerRoute<DeletePaymentTemplateRouteConfig>()({
  path: "/payment-templates",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: deletePaymentTemplateValidation.body,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.PAYMENT_TEMPLATE },
  controller: DeletePaymentTemplateController,
  isTransactionEnabled: false,
  platform: "web",
});
