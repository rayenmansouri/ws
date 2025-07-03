import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetGradesOfSecondarySubjectController } from "./getGradesOfSecondarySubject.controller";
import { GetGradesOfSecondarySubjectRouteConfig } from "./getGradesOfSecondarySubject.types";
import { getGradesOfSecondarySubjectValidation } from "./getGradesOfSecondarySubject.validation";

registerRoute<GetGradesOfSecondarySubjectRouteConfig>()({
  path: "/secondary/classes/:classNewId/subjects/:subjectNewId/grades",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getGradesOfSecondarySubjectValidation.query,
  paramSchema: getGradesOfSecondarySubjectValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetGradesOfSecondarySubjectController,
  isTransactionEnabled: false,
  platform: "web",
});
