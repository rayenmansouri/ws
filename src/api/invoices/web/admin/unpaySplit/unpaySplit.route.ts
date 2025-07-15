import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnpaySplitController } from "./unpaySplit.controller";
import { UnpaySplitRouteConfig } from "./unpaySplit.types";
import { unpaySplitValidation } from "./unpaySplit.validation";

registerRoute<UnpaySplitRouteConfig>()({
  path: "/invoices/:invoiceNewId/unpay-split/:splitIndex",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unpaySplitValidation.params,
  authorization: { action: ACTION_ENUM.UNPAY, resource: RESOURCES_ENUM.INVOICE },
  controller: UnpaySplitController,
  isTransactionEnabled: true,
  platform: "web",
});
