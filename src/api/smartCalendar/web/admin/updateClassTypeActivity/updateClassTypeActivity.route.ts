import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateClassTypeActivityController } from "./updateClassTypeActivity.controller";
import { UpdateClassTypeActivityRouteConfig } from "./updateClassTypeActivity.types";
import { updateClassTypeActivityValidation } from "./updateClassTypeActivity.validation";

registerRoute<UpdateClassTypeActivityRouteConfig>()({
  path: "/class-types/:classTypeNewId/activities/:activityIndex",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateClassTypeActivityValidation.body,
  paramSchema: updateClassTypeActivityValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: UpdateClassTypeActivityController,
  isTransactionEnabled: false,
  platform: "web",
});
