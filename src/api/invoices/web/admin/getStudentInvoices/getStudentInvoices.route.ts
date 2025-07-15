import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentInvoicesController } from "./getStudentInvoices.controller";
import { GetStudentInvoicesRouteConfig } from "./getStudentInvoices.types";
import { getStudentInvoicesValidation } from "./getStudentInvoices.validation";

registerRoute<GetStudentInvoicesRouteConfig>()({
  path: "/parents/:parentNewId/invoices",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getStudentInvoicesValidation.query,
  paramSchema: getStudentInvoicesValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.INVOICE },
  controller: GetStudentInvoicesController,
  isTransactionEnabled: false,
  platform: "web",
});
