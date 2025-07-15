import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddClassroomController } from "./addClassroom.controller";
import { AddClassroomRouteConfig } from "./addClassroom.types";
import { addClassroomValidation } from "./addClassroom.validation";

registerRoute<AddClassroomRouteConfig>()({
  path: "/classrooms",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addClassroomValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.CLASSROOM },
  controller: AddClassroomController,
  isTransactionEnabled: false,
  platform: "web",
});
