import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListClassesController } from "./listClasses.controller";
import { ListClassesRouteConfig } from "./listClasses.types";
import { listClassesValidation } from "./listClasses.validation";

registerRoute<ListClassesRouteConfig>()({
  path: "/classes",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listClassesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
  controller: ListClassesController,
  isTransactionEnabled: false,
  platform: "web",
});
