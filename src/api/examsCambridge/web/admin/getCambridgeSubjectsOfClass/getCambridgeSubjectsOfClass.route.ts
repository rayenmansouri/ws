import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetCambridgeSubjectsOfClassController } from "./getCambridgeSubjectsOfClass.controller";
import { GetCambridgeSubjectsOfClassRouteConfig } from "./getCambridgeSubjectsOfClass.types";
import { getCambridgeSubjectsOfClassValidation } from "./getCambridgeSubjectsOfClass.validation";

registerRoute<GetCambridgeSubjectsOfClassRouteConfig>()({
  path: "/cambridge/classes/:classNewId/subjects",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getCambridgeSubjectsOfClassValidation.query,
  paramSchema: getCambridgeSubjectsOfClassValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetCambridgeSubjectsOfClassController,
  isTransactionEnabled: false,
  platform: "web",
});
