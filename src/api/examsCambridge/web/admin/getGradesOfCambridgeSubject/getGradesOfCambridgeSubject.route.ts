import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfCambridgeSubjectController } from "./getGradesOfCambridgeSubject.controller";
import { GetGradesOfCambridgeSubjectRouteConfig } from "./getGradesOfCambridgeSubject.types";
import { getGradesOfCambridgeSubjectValidation } from "./getGradesOfCambridgeSubject.validation";

registerRoute<GetGradesOfCambridgeSubjectRouteConfig>()({
  path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getGradesOfCambridgeSubjectValidation.query,
  paramSchema: getGradesOfCambridgeSubjectValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetGradesOfCambridgeSubjectController,
  isTransactionEnabled: false,
  platform: "web",
});
