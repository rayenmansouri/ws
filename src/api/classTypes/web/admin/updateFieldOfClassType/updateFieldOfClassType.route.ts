import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateFieldOfClassTypeController } from "./updateFieldOfClassType.controller";
import { UpdateFieldOfClassTypeRouteConfig } from "./updateFieldOfClassType.types";
import { updateFieldOfClassTypeValidation } from "./updateFieldOfClassType.validation";

registerRoute<UpdateFieldOfClassTypeRouteConfig>()({
  path: "/class-types/:classTypeNewId/fields/:fieldRank",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateFieldOfClassTypeValidation.body,
  paramSchema: updateFieldOfClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: UpdateFieldOfClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
