import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateIBGradesOfGroupController } from "./updateIBGradesOfGroup.controller";
import { UpdateIBGradesOfGroupRouteConfig } from "./updateIBGradesOfGroup.types";
import { updateIBGradesOfGroupValidation } from "./updateIBGradesOfGroup.validation";

registerSharedRoute<UpdateIBGradesOfGroupRouteConfig>()(
  {
    path: "/ib/groups/:groupNewId/grades",
    method: "patch",
    bodySchema: updateIBGradesOfGroupValidation.body,
    paramSchema: updateIBGradesOfGroupValidation.params,
    controller: UpdateIBGradesOfGroupController,
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
