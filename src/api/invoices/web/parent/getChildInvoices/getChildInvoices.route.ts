import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetChildInvoicesController } from "./getChildInvoices.controller";
import { GetChildInvoicesRouteConfig } from "./getChildInvoices.types";
import { getChildInvoicesValidation } from "./getChildInvoices.validation";

registerRoute<GetChildInvoicesRouteConfig>()({
  path: "/invoices",
  method: "get",
  querySchema: getChildInvoicesValidation.query,
  controller: GetChildInvoicesController,
  isTransactionEnabled: false,
  endUser: END_USER_ENUM.PARENT,
  platform: "web",
});
