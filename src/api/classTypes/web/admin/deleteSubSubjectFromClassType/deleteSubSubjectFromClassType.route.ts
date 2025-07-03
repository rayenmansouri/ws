import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSubSubjectFromClassTypeController } from "./deleteSubSubjectFromClassType.controller";
import { DeleteSubSubjectFromClassTypeRouteConfig } from "./deleteSubSubjectFromClassType.types";
import { deleteSubSubjectFromClassTypeValidation } from "./deleteSubSubjectFromClassType.validation";

registerRoute<DeleteSubSubjectFromClassTypeRouteConfig>()({
  path: "/classType/:classTypeNewId/subSubjects/:subSubjectNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSubSubjectFromClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: DeleteSubSubjectFromClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
