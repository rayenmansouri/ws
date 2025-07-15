import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ImportStudentsController } from "./importStudents.controller";
import { ImportStudentsRouteConfig } from "./importStudents.types";
import { importStudentsValidation } from "./importStudents.validation";

registerRoute<ImportStudentsRouteConfig>()({
  path: "/students/import",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.STUDENT },
  bodySchema: importStudentsValidation.body,
  controller: ImportStudentsController,
  isTransactionEnabled: true,
  platform: "web",
});
