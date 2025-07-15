import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateObservationReasonController } from "./updateObservationReason.controller";
import { UpdateObservationReasonRouteConfig } from "./updateObservationReason.types";
import { updateObservationReasonValidation } from "./updateObservationReason.validation";

registerRoute<UpdateObservationReasonRouteConfig>()({
  path: "/observations-reasons/:observationReasonNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateObservationReasonValidation.body,
  paramSchema: updateObservationReasonValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.OBSERVATION },
  controller: UpdateObservationReasonController,
  isTransactionEnabled: false,
  platform: "web",
});
