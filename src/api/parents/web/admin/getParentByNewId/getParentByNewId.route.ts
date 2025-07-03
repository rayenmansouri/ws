import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetParentByNewIdController } from "./getParentByNewId.controller";
import { GetParentByNewIdRouteConfig } from "./getParentByNewId.types";
import { getParentByNewIdValidation } from "./getParentByNewId.validation";

registerRoute<GetParentByNewIdRouteConfig>()({
  path: "/parents/:parentNewId",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getParentByNewIdValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.PARENT },
  controller: GetParentByNewIdController,
  isTransactionEnabled: false,
  platform: "web",
});
