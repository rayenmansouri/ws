import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListParentsController } from "./listParents.controller";
import { ListParentsRouteConfig } from "./listParents.types";
import { listParentsValidation } from "./listParents.validation";

registerRoute<ListParentsRouteConfig>()({
  path: "/parents",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listParentsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.PARENT },
  controller: ListParentsController,
  isTransactionEnabled: false,
  platform: "web",
});
