import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListInvoicesController } from "./listInvoices.controller";
import { ListInvoicesRouteConfig } from "./listInvoices.types";
import { listInvoicesValidation } from "./listInvoices.validation";

registerRoute<ListInvoicesRouteConfig>()({
  path: "/invoices/list",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listInvoicesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.INVOICE },
  controller: ListInvoicesController,
  isTransactionEnabled: false,
  platform: "web",
});
