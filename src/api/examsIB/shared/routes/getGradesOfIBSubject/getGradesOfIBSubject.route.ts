import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetGradesOfIBSubjectController } from "./getGradesOfIBSubject.controller";
import { GetGradesOfIBSubjectRouteConfig } from "./getGradesOfIBSubject.types";
import { getGradesOfIBSubjectValidation } from "./getGradesOfIBSubject.validation";

registerSharedRoute<GetGradesOfIBSubjectRouteConfig>()(
  {
    path: "/ib/classes/:classNewId/subjects/:subjectNewId/grades",
    method: "get",
    querySchema: getGradesOfIBSubjectValidation.query,
    paramSchema: getGradesOfIBSubjectValidation.params,
    controller: GetGradesOfIBSubjectController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
  ],
);
