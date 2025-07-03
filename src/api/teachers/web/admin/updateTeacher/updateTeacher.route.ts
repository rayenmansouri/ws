import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateTeacherController } from "./updateTeacher.controller";
import { UpdateTeacherRouteConfig } from "./updateTeacher.types";
import { updateTeacherValidation } from "./updateTeacher.validation";

registerRoute<UpdateTeacherRouteConfig>()({
  path: "/teachers/:teacherNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateTeacherValidation.body,
  paramSchema: updateTeacherValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.TEACHER },
  controller: UpdateTeacherController,
  isTransactionEnabled: true,
  platform: "web",
  upload: {
    fields: [{ name: "avatar", maxCount: 1 }],
  },
});
