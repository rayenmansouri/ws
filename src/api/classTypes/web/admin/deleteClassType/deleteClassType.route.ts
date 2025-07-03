import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteClassTypeController } from "./deleteClassType.controller";
import { DeleteClassTypeRouteConfig } from "./deleteClassType.types";
import { deleteClassTypeValidation } from "./deleteClassType.validation";

registerRoute<DeleteClassTypeRouteConfig>()({
  path: "/classTypes/:classTypeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: DeleteClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
