import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteObservationController } from "./deleteObservation.controller";
import { DeleteObservationRouteConfig } from "./deleteObservation.types";
import { deleteObservationValidation } from "./deleteObservation.validation";

registerRoute<DeleteObservationRouteConfig>()({
  path: "/observations/:observationNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteObservationValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.OBSERVATION },
  controller: DeleteObservationController,
  isTransactionEnabled: false,
  platform: "web",
});
