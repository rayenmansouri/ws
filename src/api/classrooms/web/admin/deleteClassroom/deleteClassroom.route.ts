import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteClassroomController } from "./deleteClassroom.controller";
import { DeleteClassroomRouteConfig } from "./deleteClassroom.types";
import { deleteClassroomValidation } from "./deleteClassroom.validation";

registerRoute<DeleteClassroomRouteConfig>()({
  path: "/classrooms/:classroomNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteClassroomValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.CLASSROOM },
  controller: DeleteClassroomController,
  isTransactionEnabled: false,
  platform: "web",
});
