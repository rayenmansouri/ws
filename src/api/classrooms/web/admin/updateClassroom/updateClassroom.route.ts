import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateClassroomController } from "./updateClassroom.controller";
import { UpdateClassroomRouteConfig } from "./updateClassroom.types";
import { updateClassroomValidation } from "./updateClassroom.validation";

registerRoute<UpdateClassroomRouteConfig>()({
  path: "/classrooms/:classroomNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateClassroomValidation.body,
  paramSchema: updateClassroomValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASSROOM },
  controller: UpdateClassroomController,
  isTransactionEnabled: false,
  platform: "web",
});
