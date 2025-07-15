import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfSecondarySubjectController } from "./getGradesOfSecondarySubject.controller";
import { GetGradesOfSecondarySubjectRouteConfig } from "./getGradesOfSecondarySubject.types";
import { getGradesOfSecondarySubjectValidation } from "./getGradesOfSecondarySubject.validation";

registerRoute<GetGradesOfSecondarySubjectRouteConfig>()({
  path: "/secondary/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "get",
  endUser: END_USER_ENUM.TEACHER,
  querySchema: getGradesOfSecondarySubjectValidation.query,
  paramSchema: getGradesOfSecondarySubjectValidation.params,
  controller: GetGradesOfSecondarySubjectController,
  isTransactionEnabled: false,
  platform: "web",
});
