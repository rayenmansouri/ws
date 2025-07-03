import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { HideTermController } from "./hideTerm.controller";
import { HideTermRouteConfig } from "./hideTerm.types";
import { hideTermValidation } from "./hideTerm.validation";

registerRoute<HideTermRouteConfig>()({
  path: "/classes/:classNewId/terms/:termId/hide",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: hideTermValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: HideTermController,
  isTransactionEnabled: false,
  platform: "web",
});
