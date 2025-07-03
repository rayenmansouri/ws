import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteFieldFromClassTypeController } from "./deleteFieldFromClassType.controller";
import { DeleteFieldFromClassTypeRouteConfig } from "./deleteFieldFromClassType.types";
import { deleteFieldFromClassTypeValidation } from "./deleteFieldFromClassType.validation";

registerRoute<DeleteFieldFromClassTypeRouteConfig>()({
  path: "/class-types/:classTypeNewId/fields/:fieldIndex",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteFieldFromClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: DeleteFieldFromClassTypeController,
  isTransactionEnabled: true,
  platform: "web",
});
