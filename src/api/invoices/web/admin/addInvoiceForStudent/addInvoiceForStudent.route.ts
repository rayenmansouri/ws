import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddInvoiceForStudentController } from "./addInvoiceForStudent.controller";
import { AddInvoiceForStudentRouteConfig } from "./addInvoiceForStudent.types";
import { addInvoiceForStudentValidation } from "./addInvoiceForStudent.validation";

registerRoute<AddInvoiceForStudentRouteConfig>()({
  path: "/invoices",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addInvoiceForStudentValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.INVOICE },
  controller: AddInvoiceForStudentController,
  isTransactionEnabled: false,
  platform: "web",
});
