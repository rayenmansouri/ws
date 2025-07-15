import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteInvoiceController } from "./deleteInvoice.controller";
import { DeleteInvoiceRouteConfig } from "./deleteInvoice.types";
import { deleteInvoiceValidation } from "./deleteInvoice.validation";

registerRoute<DeleteInvoiceRouteConfig>()({
  path: "/invoices/:invoiceNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteInvoiceValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.INVOICE },
  controller: DeleteInvoiceController,
  isTransactionEnabled: false,
  platform: "web",
});
