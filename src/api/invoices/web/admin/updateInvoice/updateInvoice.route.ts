import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateInvoiceController } from "./updateInvoice.controller";
import { UpdateInvoiceRouteConfig } from "./updateInvoice.types";
import { updateInvoiceValidation } from "./updateInvoice.validation";

registerRoute<UpdateInvoiceRouteConfig>()({
  path: "/invoices/:invoiceNewId",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateInvoiceValidation.body,
  paramSchema: updateInvoiceValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.INVOICE },
  controller: UpdateInvoiceController,
  isTransactionEnabled: false,
  platform: "web",
});
