import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListPaymentTemplatesController } from "./listPaymentTemplates.controller";
import { ListPaymentTemplatesRouteConfig } from "./listPaymentTemplates.types";
import { listPaymentTemplatesValidation } from "./listPaymentTemplates.validation";

registerRoute<ListPaymentTemplatesRouteConfig>()({
  path: "/payment-templates",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listPaymentTemplatesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.PAYMENT_TEMPLATE },
  controller: ListPaymentTemplatesController,
  isTransactionEnabled: false,
  platform: "web",
});
