import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteClassTypeActivityController } from "./deleteClassTypeActivity.controller";
import { DeleteClassTypeActivityRouteConfig } from "./deleteClassTypeActivity.types";
import { deleteClassTypeActivityValidation } from "./deleteClassTypeActivity.validation";

registerRoute<DeleteClassTypeActivityRouteConfig>()({
  path: "/class-types/:classTypeNewId/activities/:activityIndex",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteClassTypeActivityValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: DeleteClassTypeActivityController,
  isTransactionEnabled: false,
  platform: "web",
});
