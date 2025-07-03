import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { DeleteSubjectTypeController } from "./deleteSubjectType.controller";
import { DeleteSubjectTypeRouteConfig } from "./deleteSubjectType.types";
import { deleteSubjectTypeValidation } from "./deleteSubjectType.validation";

registerRoute<DeleteSubjectTypeRouteConfig>()({
  path: "/subject-types/:subjectTypeNewId",
  method: "delete",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: deleteSubjectTypeValidation.params,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.SUBJECT },
  controller: DeleteSubjectTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
