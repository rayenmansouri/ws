import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddTeacherController } from "./addTeacher.controller";
import { AddTeacherRouteConfig } from "./addTeacher.types";
import { addTeacherValidation } from "./addTeacher.validation";

registerRoute<AddTeacherRouteConfig>()({
  path: "/teacher",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addTeacherValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.TEACHER },
  controller: AddTeacherController,
  isTransactionEnabled: true,
  platform: "web",
  upload: { fields: [{ name: "avatar", maxCount: 1 }] },
});
