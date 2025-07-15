import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateClassController } from "./updateClass.controller";
import { UpdateClassRouteConfig } from "./updateClass.types";
import { updateClassValidation } from "./updateClass.validation";

registerRoute<UpdateClassRouteConfig>()({
  path: "/classes/:classNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateClassValidation.body,
  paramSchema: updateClassValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS },
  controller: UpdateClassController,
  isTransactionEnabled: false,
  platform: "web",
});
