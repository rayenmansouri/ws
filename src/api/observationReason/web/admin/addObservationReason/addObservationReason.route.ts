import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddObservationReasonController } from "./addObservationReason.controller";
import { AddObservationReasonRouteConfig } from "./addObservationReason.types";
import { addObservationReasonValidation } from "./addObservationReason.validation";

registerRoute<AddObservationReasonRouteConfig>()({
  path: "/observations-reasons",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addObservationReasonValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.OBSERVATION },
  controller: AddObservationReasonController,
  isTransactionEnabled: false,
  platform: "web",
});
