import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListMastersController } from "./listMasters.controller";
import { ListMastersRouteConfig } from "./listMasters.types";
import { listMastersValidation } from "./listMasters.validation";

registerRoute<ListMastersRouteConfig>()({
  path: "/masters",
  method: "get",
  endUser: END_USER_ENUM.MASTER,
  querySchema: listMastersValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.MASTER },
  controller: ListMastersController,
  platform: "web",
});
