import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListUnenrolledStudentsController } from "./listUnenrolledStudents.controller";
import { ListUnenrolledStudentsRouteConfig } from "./listUnenrolledStudents.types";
import { listUnenrolledStudentsValidation } from "./listUnenrolledStudents.validation";

registerRoute<ListUnenrolledStudentsRouteConfig>()({
  path: "/unenrolled-students",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listUnenrolledStudentsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.STUDENT },
  controller: ListUnenrolledStudentsController,
  isTransactionEnabled: false,
  platform: "web",
});
