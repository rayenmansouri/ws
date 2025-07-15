import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateCambridgeGradesOfGroupController } from "./updateCambridgeGradesOfGroup.controller";
import { UpdateCambridgeGradesOfGroupRouteConfig } from "./updateCambridgeGradesOfGroup.types";
import { updateCambridgeGradesOfGroupValidation } from "./updateCambridgeGradesOfGroup.validation";

registerSharedRoute<UpdateCambridgeGradesOfGroupRouteConfig>()(
  {
    path: "/cambridge/groups/:groupNewId/grades",
    method: "patch",
    bodySchema: updateCambridgeGradesOfGroupValidation.body,
    paramSchema: updateCambridgeGradesOfGroupValidation.params,
    controller: UpdateCambridgeGradesOfGroupController,
    isTransactionEnabled: true,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
    },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web"] },
  ],
);
