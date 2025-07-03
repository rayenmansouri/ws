import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSubjectTypeController } from "./updateSubjectType.controller";
import { UpdateSubjectTypeRouteConfig } from "./updateSubjectType.types";
import { updateSubjectTypeValidation } from "./updateSubjectType.validation";

registerRoute<UpdateSubjectTypeRouteConfig>()({
  path: "/subject-types/:subjectTypeNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateSubjectTypeValidation.body,
  paramSchema: updateSubjectTypeValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SUBJECT },
  controller: UpdateSubjectTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
