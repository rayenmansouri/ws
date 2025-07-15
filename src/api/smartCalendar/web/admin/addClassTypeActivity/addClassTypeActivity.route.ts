import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddClassTypeActivityController } from "./addClassTypeActivity.controller";
import { AddClassTypeActivityRouteConfig } from "./addClassTypeActivity.types";
import { addClassTypeActivityValidation } from "./addClassTypeActivity.validation";

registerRoute<AddClassTypeActivityRouteConfig>()({
  path: "/class-types/:classTypeNewId/activities",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addClassTypeActivityValidation.body,
  paramSchema: addClassTypeActivityValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: AddClassTypeActivityController,
  isTransactionEnabled: false,
  platform: "web",
});
