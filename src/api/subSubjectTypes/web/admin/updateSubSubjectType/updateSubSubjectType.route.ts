import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSubSubjectTypeController } from "./updateSubSubjectType.controller";
import { UpdateSubSubjectTypeRouteConfig } from "./updateSubSubjectType.types";
import { updateSubSubjectTypeValidation } from "./updateSubSubjectType.validation";

registerRoute<UpdateSubSubjectTypeRouteConfig>()({
  path: "/sub-subject-types/:subSubjectTypeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSubSubjectTypeValidation.body,
  paramSchema: updateSubSubjectTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SUB_SUBJECT },
  controller: UpdateSubSubjectTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
