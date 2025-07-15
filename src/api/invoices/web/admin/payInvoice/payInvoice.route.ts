import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { PayInvoiceController } from "./payInvoice.controller";
import { PayInvoiceRouteConfig } from "./payInvoice.types";
import { payInvoiceValidation } from "./payInvoice.validation";

registerRoute<PayInvoiceRouteConfig>()({
  path: "/invoices/:invoiceNewId/pay",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: payInvoiceValidation.body,
  paramSchema: payInvoiceValidation.params,
  authorization: { action: ACTION_ENUM.PAY, resource: RESOURCES_ENUM.INVOICE },
  controller: PayInvoiceController,
  isTransactionEnabled: true,
  platform: "web",
});
