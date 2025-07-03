import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSubSubjectTypeController } from "./deleteSubSubjectType.controller";
import { DeleteSubSubjectTypeRouteConfig } from "./deleteSubSubjectType.types";
import { deleteSubSubjectTypeValidation } from "./deleteSubSubjectType.validation";

registerRoute<DeleteSubSubjectTypeRouteConfig>()({
  path: "/sub-subject-type/:subSubjectTypeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSubSubjectTypeValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SUB_SUBJECT },
  controller: DeleteSubSubjectTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
