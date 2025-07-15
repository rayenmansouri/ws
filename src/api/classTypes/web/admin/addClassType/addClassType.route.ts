import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddClassTypeController } from "./addClassType.controller";
import { AddClassTypeRouteConfig } from "./addClassType.types";
import { addClassTypeValidation } from "./addClassType.validation";

registerRoute<AddClassTypeRouteConfig>()({
  path: "/class-types",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addClassTypeValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: AddClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
