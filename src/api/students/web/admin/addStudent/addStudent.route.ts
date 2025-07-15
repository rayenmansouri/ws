import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddStudentController } from "./addStudent.controller";
import { AddStudentRouteConfig } from "./addStudent.types";
import { addStudentValidation } from "./addStudent.validation";

registerRoute<AddStudentRouteConfig>()({
  path: "/student",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addStudentValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.STUDENT },
  controller: AddStudentController,
  upload: { fields: [{ name: "avatar", maxCount: 1 }] },
  isTransactionEnabled: true,
  platform: "web",
});
