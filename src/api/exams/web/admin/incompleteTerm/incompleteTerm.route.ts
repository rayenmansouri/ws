import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { IncompleteTermController } from "./incompleteTerm.controller";
import { IncompleteTermRouteConfig } from "./incompleteTerm.types";
import { incompleteTermValidation } from "./incompleteTerm.validation";

registerRoute<IncompleteTermRouteConfig>()({
  path: "/classes/:classNewId/terms/:termNewId/incomplete",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: incompleteTermValidation.params,
  bodySchema: incompleteTermValidation.body,
  authorization: { action: ACTION_ENUM.DELETE, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: IncompleteTermController,
  isTransactionEnabled: false,
  platform: "web",
});
