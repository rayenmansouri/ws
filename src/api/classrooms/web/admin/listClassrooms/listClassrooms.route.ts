import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListClassroomsController } from "./listClassrooms.controller";
import { ListClassroomsRouteConfig } from "./listClassrooms.types";
import { listClassroomsValidation } from "./listClassrooms.validation";

registerRoute<ListClassroomsRouteConfig>()({
  path: "/classrooms",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listClassroomsValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.CLASS },
  controller: ListClassroomsController,
  isTransactionEnabled: false,
  platform: "web",
});
