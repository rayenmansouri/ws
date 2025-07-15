import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateTeacherConstraintsController } from "./updateTeacherConstraints.controller";
import { UpdateTeacherConstraintsRouteConfig } from "./updateTeacherConstraints.types";
import { updateTeacherConstraintsValidation } from "./updateTeacherConstraints.validation";

registerRoute<UpdateTeacherConstraintsRouteConfig>()({
  path: "/teachers/:teacherNewId/constraints",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateTeacherConstraintsValidation.body,
  paramSchema: updateTeacherConstraintsValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: UpdateTeacherConstraintsController,
  isTransactionEnabled: false,
  platform: "web",
});
