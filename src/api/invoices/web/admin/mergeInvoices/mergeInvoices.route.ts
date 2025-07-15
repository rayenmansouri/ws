import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { MergeInvoicesController } from "./mergeInvoices.controller";
import { MergeInvoicesRouteConfig } from "./mergeInvoices.types";
import { mergeInvoicesValidation } from "./mergeInvoices.validation";

registerRoute<MergeInvoicesRouteConfig>()({
  path: "/invoices/merge",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: mergeInvoicesValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.INVOICE },
  controller: MergeInvoicesController,
  isTransactionEnabled: true,
  platform: "web",
});
