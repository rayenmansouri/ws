import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetInvoiceDetailsController } from "./getInvoiceDetails.controller";
import { GetInvoiceDetailsRouteConfig } from "./getInvoiceDetails.types";
import { getInvoiceDetailsValidation } from "./getInvoiceDetails.validation";

registerRoute<GetInvoiceDetailsRouteConfig>()({
  path: "/invoices/:invoiceNewId",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getInvoiceDetailsValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.INVOICE },
  controller: GetInvoiceDetailsController,
  isTransactionEnabled: false,
  platform: "web",
});
