import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListServicesController } from "./listServices.controller";
import { ListServicesRouteConfig } from "./listServices.types";
import { listServicesValidation } from "./listServices.validation";

registerRoute<ListServicesRouteConfig>()({
  path: "/services",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listServicesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SERVICE },
  controller: ListServicesController,
  isTransactionEnabled: false,
  platform: "web",
});
