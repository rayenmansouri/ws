import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateCambridgeGradesController } from "./updateCambridgeGrades.controller";
import { UpdateCambridgeGradesRouteConfig } from "./updateCambridgeGrades.types";
import { updateCambridgeGradesValidation } from "./updateCambridgeGrades.validation";

registerSharedRoute<UpdateCambridgeGradesRouteConfig>()(
  {
    path: "/cambridge/classes/:classNewId/subjects/:subjectNewId/grades",
    method: "patch",
    bodySchema: updateCambridgeGradesValidation.body,
    paramSchema: updateCambridgeGradesValidation.params,
    controller: UpdateCambridgeGradesController,
    isTransactionEnabled: true,
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
