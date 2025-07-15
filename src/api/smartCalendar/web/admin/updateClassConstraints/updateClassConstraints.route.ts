import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateClassConstraintsController } from "./updateClassConstraints.controller";
import { UpdateClassConstraintsRouteConfig } from "./updateClassConstraints.types";
import { updateClassConstraintsValidation } from "./updateClassConstraints.validation";

registerRoute<UpdateClassConstraintsRouteConfig>()({
  path: "/classes/:classNewId/constraints",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateClassConstraintsValidation.body,
  paramSchema: updateClassConstraintsValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: UpdateClassConstraintsController,
  isTransactionEnabled: false,
  platform: "web",
});
