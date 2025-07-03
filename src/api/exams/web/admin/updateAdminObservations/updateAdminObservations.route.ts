import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateAdminObservationsController } from "./updateAdminObservations.controller";
import { UpdateAdminObservationsRouteConfig } from "./updateAdminObservations.types";
import { updateAdminObservationsValidation } from "./updateAdminObservations.validation";

registerRoute<UpdateAdminObservationsRouteConfig>()({
  path: "/ib/classes/:classNewId/admin-observations",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateAdminObservationsValidation.body,
  paramSchema: updateAdminObservationsValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: UpdateAdminObservationsController,
  isTransactionEnabled: false,
  platform: "web",
});
