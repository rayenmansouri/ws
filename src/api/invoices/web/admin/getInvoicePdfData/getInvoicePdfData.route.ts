import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetInvoicePdfDataController } from "./getInvoicePdfData.controller";
import { GetInvoicePdfDataRouteConfig } from "./getInvoicePdfData.types";
import { getInvoicePdfDataValidation } from "./getInvoicePdfData.validation";

registerRoute<GetInvoicePdfDataRouteConfig>()({
  path: "/invoices/:invoiceNewId/generate-payment-information",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getInvoicePdfDataValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.INVOICE },
  controller: GetInvoicePdfDataController,
  isTransactionEnabled: false,
  platform: "web",
});
