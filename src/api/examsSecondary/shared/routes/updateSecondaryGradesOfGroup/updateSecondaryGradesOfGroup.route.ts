import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateSecondaryGradesOfGroupController } from "./updateSecondaryGradesOfGroup.controller";
import { UpdateSecondaryGradesOfGroupRouteConfig } from "./updateSecondaryGradesOfGroup.types";
import { updateSecondaryGradesOfGroupValidation } from "./updateSecondaryGradesOfGroup.validation";

registerSharedRoute<UpdateSecondaryGradesOfGroupRouteConfig>()(
  {
    path: "/secondary/groups/:groupNewId/grades",
    method: "patch",
    bodySchema: updateSecondaryGradesOfGroupValidation.body,
    paramSchema: updateSecondaryGradesOfGroupValidation.params,
    controller: UpdateSecondaryGradesOfGroupController,
    isTransactionEnabled: false,
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
