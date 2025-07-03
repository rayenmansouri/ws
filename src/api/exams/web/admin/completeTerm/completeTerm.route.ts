import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { CompleteTermController } from "./completeTerm.controller";
import { CompleteTermRouteConfig } from "./completeTerm.types";
import { completeTermValidation } from "./completeTerm.validation";

registerRoute<CompleteTermRouteConfig>()({
  path: "/classes/:classNewId/terms/:termNewId/complete",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: completeTermValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: CompleteTermController,
  isTransactionEnabled: false,
  platform: "web",
});
