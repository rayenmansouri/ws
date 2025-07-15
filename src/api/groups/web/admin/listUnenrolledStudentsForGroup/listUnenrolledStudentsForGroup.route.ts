import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListUnenrolledStudentsForGroupController } from "./listUnenrolledStudentsForGroup.controller";
import { ListUnenrolledStudentsForGroupRouteConfig } from "./listUnenrolledStudentsForGroup.types";
import { listUnenrolledStudentsForGroupValidation } from "./listUnenrolledStudentsForGroup.validation";

registerRoute<ListUnenrolledStudentsForGroupRouteConfig>()({
  path: "/groups/unenrolled-students",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listUnenrolledStudentsForGroupValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.STUDENT },
  controller: ListUnenrolledStudentsForGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
