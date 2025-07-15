import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetAlertDetailsController } from "./getAlertDetails.controller";
import { GetAlertDetailsRouteConfig } from "./getAlertDetails.types";
import { getAlertDetailsValidation } from "./getAlertDetails.validation";

registerRoute<GetAlertDetailsRouteConfig>()({
  path: "/alerts/:alertNewId/details",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getAlertDetailsValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ALERT },
  controller: GetAlertDetailsController,
  isTransactionEnabled: false,
  platform: "web",
});
