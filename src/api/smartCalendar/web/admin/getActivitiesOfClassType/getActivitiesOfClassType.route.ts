import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetActivitiesOfClassTypeController } from "./getActivitiesOfClassType.controller";
import { GetActivitiesOfClassTypeRouteConfig } from "./getActivitiesOfClassType.types";
import { getActivitiesOfClassTypeValidation } from "./getActivitiesOfClassType.validation";

registerRoute<GetActivitiesOfClassTypeRouteConfig>()({
  path: "/class-types/:classTypeNewId/activities",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getActivitiesOfClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: GetActivitiesOfClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
