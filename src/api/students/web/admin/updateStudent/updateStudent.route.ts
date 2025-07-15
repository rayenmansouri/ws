import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateStudentController } from "./updateStudent.controller";
import { UpdateStudentRouteConfig } from "./updateStudent.types";
import { updateStudentValidation } from "./updateStudent.validation";

registerRoute<UpdateStudentRouteConfig>()({
  path: "/students/:studentNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateStudentValidation.body,
  paramSchema: updateStudentValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.STUDENT },
  controller: UpdateStudentController,
  isTransactionEnabled: true,
  platform: "web",
  upload: {
    fields: [{ name: "avatar", maxCount: 1 }],
  },
});
