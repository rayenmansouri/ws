import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListObservationsController } from "./listObservations.controller";
import { ListObservationsRouteConfig } from "./listObservations.types";
import { listObservationsValidation } from "./listObservations.validation";

registerRoute<ListObservationsRouteConfig>()({
  path: "/observations",
  method: "get",
  querySchema: listObservationsValidation.query,
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.OBSERVATION },
  controller: ListObservationsController,
  isTransactionEnabled: false,
  platform: "web",
});
