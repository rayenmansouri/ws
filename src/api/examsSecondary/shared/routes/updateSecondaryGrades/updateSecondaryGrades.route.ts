import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateSecondaryGradesController } from "./updateSecondaryGrades.controller";
import { UpdateSecondaryGradesRouteConfig } from "./updateSecondaryGrades.types";
import { updateSecondaryGradesValidation } from "./updateSecondaryGrades.validation";

registerSharedRoute<UpdateSecondaryGradesRouteConfig>()(
  {
    path: "/secondary/classes/:classNewId/subjects/:subjectNewId/grades",
    method: "patch",
    bodySchema: updateSecondaryGradesValidation.body,
    paramSchema: updateSecondaryGradesValidation.params,
    controller: UpdateSecondaryGradesController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
    },
  ],
);
