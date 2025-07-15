import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteClassController } from "./deleteClass.controller";
import { DeleteClassRouteConfig } from "./deleteClass.types";
import { deleteClassValidation } from "./deleteClass.validation";

registerRoute<DeleteClassRouteConfig>()({
  path: "/classes/:classNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteClassValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.CLASS },
  controller: DeleteClassController,
  isTransactionEnabled: true,
  platform: "web",
});
