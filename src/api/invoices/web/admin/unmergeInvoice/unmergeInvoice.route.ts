import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UnmergeInvoiceController } from "./unmergeInvoice.controller";
import { UnmergeInvoiceRouteConfig } from "./unmergeInvoice.types";
import { unmergeInvoiceValidation } from "./unmergeInvoice.validation";

registerRoute<UnmergeInvoiceRouteConfig>()({
  path: "/invoices/:invoiceNewId/undo-merge",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: unmergeInvoiceValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.INVOICE },
  controller: UnmergeInvoiceController,
  isTransactionEnabled: true,
  platform: "web",
});
