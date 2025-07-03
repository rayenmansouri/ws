import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSubjectTypeController } from "./addSubjectType.controller";
import { AddSubjectTypeRouteConfig } from "./addSubjectType.types";
import { addSubjectTypeValidation } from "./addSubjectType.validation";

registerRoute<AddSubjectTypeRouteConfig>()({
  path: "/subject-types",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSubjectTypeValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SUBJECT },
  controller: AddSubjectTypeController,
  isTransactionEnabled: false,
  platform: "web",
});
