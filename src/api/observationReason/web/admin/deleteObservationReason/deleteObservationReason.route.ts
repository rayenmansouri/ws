import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteObservationReasonController } from "./deleteObservationReason.controller";
import { DeleteObservationReasonRouteConfig } from "./deleteObservationReason.types";
import { deleteObservationReasonValidation } from "./deleteObservationReason.validation";

registerRoute<DeleteObservationReasonRouteConfig>()({
  path: "/observations-reason/:observationReasonNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteObservationReasonValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.OBSERVATION },
  controller: DeleteObservationReasonController,
  isTransactionEnabled: false,
  platform: "web",
});
