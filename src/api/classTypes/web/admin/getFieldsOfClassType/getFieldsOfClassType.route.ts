import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetFieldsOfClassTypeController } from "./getFieldsOfClassType.controller";
import { GetFieldsOfClassTypeRouteConfig } from "./getFieldsOfClassType.types";
import { getFieldsOfClassTypeValidation } from "./getFieldsOfClassType.validation";

registerRoute<GetFieldsOfClassTypeRouteConfig>()({
  path: "/classTypes/:classTypeNewId/fields",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getFieldsOfClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: GetFieldsOfClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
