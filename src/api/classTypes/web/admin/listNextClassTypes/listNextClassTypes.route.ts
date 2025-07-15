import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListNextClassTypesController } from "./listNextClassTypes.controller";
import { ListNextClassTypesRouteConfig } from "./listNextClassTypes.types";
import { listNextClassTypesValidation } from "./listNextClassTypes.validation";

registerRoute<ListNextClassTypesRouteConfig>()({
  path: "/next-classTypes",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listNextClassTypesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: ListNextClassTypesController,
  isTransactionEnabled: false,
  platform: "web",
});
