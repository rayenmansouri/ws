import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddFieldToClassTypeController } from "./addFieldToClassType.controller";
import { AddFieldToClassTypeRouteConfig } from "./addFieldToClassType.types";
import { addFieldToClassTypeValidation } from "./addFieldToClassType.validation";

registerRoute<AddFieldToClassTypeRouteConfig>()({
  path: "/classType/:classTypeNewId/fields",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addFieldToClassTypeValidation.body,
  paramSchema: addFieldToClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: AddFieldToClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
