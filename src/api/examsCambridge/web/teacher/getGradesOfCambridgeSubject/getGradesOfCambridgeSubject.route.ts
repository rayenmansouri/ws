import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfCambridgeSubjectController } from "./getGradesOfCambridgeSubject.controller";
import { GetGradesOfCambridgeSubjectRouteConfig } from "./getGradesOfCambridgeSubject.types";
import { getGradesOfCambridgeSubjectValidation } from "./getGradesOfCambridgeSubject.validation";

registerRoute<GetGradesOfCambridgeSubjectRouteConfig>()({
  path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getGradesOfCambridgeSubjectValidation.query,
  paramSchema: getGradesOfCambridgeSubjectValidation.params,
  controller: GetGradesOfCambridgeSubjectController,
  isTransactionEnabled: false,
  platform: "web",
});
