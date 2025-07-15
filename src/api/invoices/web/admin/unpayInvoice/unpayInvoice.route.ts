import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnpayInvoiceController } from "./unpayInvoice.controller";
import { UnpayInvoiceRouteConfig } from "./unpayInvoice.types";
import { unpayInvoiceValidation } from "./unpayInvoice.validation";

registerRoute<UnpayInvoiceRouteConfig>()({
  path: "/invoices/:invoiceNewId/unpay",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unpayInvoiceValidation.params,
  authorization: { action: ACTION_ENUM.UNPAY, resource: RESOURCES_ENUM.INVOICE },
  controller: UnpayInvoiceController,
  isTransactionEnabled: false,
  platform: "web",
});
