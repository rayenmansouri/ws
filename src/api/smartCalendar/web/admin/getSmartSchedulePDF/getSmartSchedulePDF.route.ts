import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSmartSchedulePDFController } from "./getSmartSchedulePDF.controller";
import { GetSmartSchedulePDFRouteConfig } from "./getSmartSchedulePDF.types";
import { GetSmartSchedulePDFValidation } from "./getSmartSchedulePDF.validation";

registerRoute<GetSmartSchedulePDFRouteConfig>()({
  path: "/smart-calendar-schedules/:scheduleNewId/pdf",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: GetSmartSchedulePDFValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: GetSmartSchedulePDFController,
  isTransactionEnabled: false,
  platform: "web",
});
