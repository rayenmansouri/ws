import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetIBAdminObservationsController } from "./getIBAdminObservations.controller";
import { GetIBAdminObservationsRouteConfig } from "./getIBAdminObservations.types";
import { getIBAdminObservationsValidation } from "./getIBAdminObservations.validation";

registerRoute<GetIBAdminObservationsRouteConfig>()({
  path: "/ib/classes/:classNewId/admin-observations",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getIBAdminObservationsValidation.query,
  paramSchema: getIBAdminObservationsValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetIBAdminObservationsController,
  isTransactionEnabled: false,
  platform: "web",
});
