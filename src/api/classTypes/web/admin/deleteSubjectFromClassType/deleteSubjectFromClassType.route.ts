import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSubjectFromClassTypeController } from "./deleteSubjectFromClassType.controller";
import { DeleteSubjectFromClassTypeRouteConfig } from "./deleteSubjectFromClassType.types";
import { deleteSubjectFromClassTypeValidation } from "./deleteSubjectFromClassType.validation";

registerRoute<DeleteSubjectFromClassTypeRouteConfig>()({
  path: "/class-types/:classTypeNewId/subjects/:subjectTypeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSubjectFromClassTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.CLASS_TYPE },
  controller: DeleteSubjectFromClassTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
