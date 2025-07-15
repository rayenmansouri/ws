import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfCambridgeGroupController } from "./getGradesOfCambridgeGroup.controller";
import { GetGradesOfCambridgeGroupRouteConfig } from "./getGradesOfCambridgeGroup.types";
import { getGradesOfCambridgeGroupValidation } from "./getGradesOfCambridgeGroup.validation";

registerRoute<GetGradesOfCambridgeGroupRouteConfig>()({
  path: "/cambridge/groups/:groupNewId/grades",
  endUser: END_USER_ENUM.ADMIN,
  method: "get",
  querySchema: getGradesOfCambridgeGroupValidation.query,
  paramSchema: getGradesOfCambridgeGroupValidation.params,
  controller: GetGradesOfCambridgeGroupController,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  isTransactionEnabled: false,
  platform: "web",
});
