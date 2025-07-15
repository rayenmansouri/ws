import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListStudentsController } from "./listStudents.controller";
import { ListStudentsRouteConfig } from "./listStudents.types";
import { listStudentsValidation } from "./listStudents.validation";

registerRoute<ListStudentsRouteConfig>()({
  path: "/students",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listStudentsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.STUDENT },
  controller: ListStudentsController,
  isTransactionEnabled: false,
  platform: "web",
});
