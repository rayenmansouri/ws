import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdatePrimaryGradesController } from "./updatePrimaryGrades.controller";
import { UpdatePrimaryGradesRouteConfig } from "./updatePrimaryGrades.types";
import { updatePrimaryGradesValidation } from "./updatePrimaryGrades.validation";

registerSharedRoute<UpdatePrimaryGradesRouteConfig>()(
  {
    path: "/primary/classes/:classNewId/fields/:fieldIndex/grades",
    method: "patch",
    bodySchema: updatePrimaryGradesValidation.body,
    paramSchema: updatePrimaryGradesValidation.params,
    controller: UpdatePrimaryGradesController,
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
