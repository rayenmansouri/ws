import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateInvoiceRemindersController } from "./updateInvoiceReminders.controller";
import { UpdateInvoiceRemindersRouteConfig } from "./updateInvoiceReminders.types";
import { updateInvoiceRemindersValidation } from "./updateInvoiceReminders.validation";

registerRoute<UpdateInvoiceRemindersRouteConfig>()({
  path: "/invoices/:invoiceNewId/reminders",
  method: "put",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: updateInvoiceRemindersValidation.params,
  bodySchema: updateInvoiceRemindersValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.INVOICE },
  controller: UpdateInvoiceRemindersController,
  isTransactionEnabled: false,
  platform: "web",
});
