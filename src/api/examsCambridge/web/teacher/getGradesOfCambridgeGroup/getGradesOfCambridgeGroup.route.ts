import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfCambridgeGroupController } from "./getGradesOfCambridgeGroup.controller";
import { GetGradesOfCambridgeGroupRouteConfig } from "./getGradesOfCambridgeGroup.types";
import { getGradesOfCambridgeGroupValidation } from "./getGradesOfCambridgeGroup.validation";

registerRoute<GetGradesOfCambridgeGroupRouteConfig>()({
  path: "/cambridge/groups/:groupNewId/grades",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getGradesOfCambridgeGroupValidation.query,
  paramSchema: getGradesOfCambridgeGroupValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetGradesOfCambridgeGroupController,
  isTransactionEnabled: false,
  platform: "web",
});
