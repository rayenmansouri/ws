import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSearchInvoiceController } from "./getSearchInvoice.controller";
import { GetSearchInvoiceRouteConfig } from "./getSearchInvoice.types";
import { getSearchInvoiceValidation } from "./getSearchInvoice.validation";

registerRoute<GetSearchInvoiceRouteConfig>()({
  path: "/invoices/search/:searchTerm",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getSearchInvoiceValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.INVOICE },
  controller: GetSearchInvoiceController,
  isTransactionEnabled: false,
  platform: "web",
});
