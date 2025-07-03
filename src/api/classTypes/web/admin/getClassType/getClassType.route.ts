import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetClassTypeController } from "./getClassType.controller";
import { GetClassTypeRouteConfig } from "./getClassType.types";
import { getClassTypeValidation } from "./getClassType.validation";

registerRoute<GetClassTypeRouteConfig>()({
  path: "/class-types/:classTypeNewId",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASSROOM },
  controller: GetClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
