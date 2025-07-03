import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListTeachersController } from "./listTeachers.controller";
import { ListTeachersRouteConfig } from "./listTeachers.types";
import { listTeachersValidation } from "./listTeachers.validation";

registerRoute<ListTeachersRouteConfig>()({
  path: "/teachers",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listTeachersValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.TEACHER },
  controller: ListTeachersController,
  isTransactionEnabled: false,
  platform: "web",
});
