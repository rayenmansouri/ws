import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { PublishTermController } from "./publishTerm.controller";
import { PublishTermRouteConfig } from "./publishTerm.types";
import { publishTermValidation } from "./publishTerm.validation";

registerRoute<PublishTermRouteConfig>()({
  path: "/classes/:classNewId/terms/:termId/publish",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: publishTermValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: PublishTermController,
  isTransactionEnabled: false,
  platform: "web",
});
