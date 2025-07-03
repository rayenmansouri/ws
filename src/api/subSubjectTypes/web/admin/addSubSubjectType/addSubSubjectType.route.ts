import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSubSubjectTypeController } from "./addSubSubjectType.controller";
import { AddSubSubjectTypeRouteConfig } from "./addSubSubjectType.types";
import { addSubSubjectTypeValidation } from "./addSubSubjectType.validation";

registerRoute<AddSubSubjectTypeRouteConfig>()({
  path: "/sub-subject-types",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSubSubjectTypeValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SUB_SUBJECT },
  controller: AddSubSubjectTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
