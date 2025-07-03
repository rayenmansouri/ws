import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateSmsSoldController } from "./updateSmsSold.controller";
import { UpdateSmsSoldRouteConfig } from "./updateSmsSold.types";
import { updateSmsSoldValidation } from "./updateSmsSold.validation";

registerRoute<UpdateSmsSoldRouteConfig>()({
  path: "/schools/:schoolId/sms-sold",
  method: "patch",
  endUser: END_USER_ENUM.MASTER,
  bodySchema: updateSmsSoldValidation.body,
  paramSchema: updateSmsSoldValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SMS_HISTORY },
  controller: UpdateSmsSoldController,
  isTransactionEnabled: true,
  platform: "web",
});
