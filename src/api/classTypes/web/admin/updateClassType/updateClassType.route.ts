import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateClassTypeController } from "./updateClassType.controller";
import { UpdateClassTypeRouteConfig } from "./updateClassType.types";
import { updateClassTypeValidation } from "./updateClassType.validation";

registerRoute<UpdateClassTypeRouteConfig>()({
  path: "/classType/:classTypeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateClassTypeValidation.body,
  paramSchema: updateClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: UpdateClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
