import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddSessionForClassController } from "./addSessionForClass.constroller";
import { AddSessionForClassRouteConfig } from "./addSessionForClass.types";
import { addSessionForClassValidation } from "./addSessionForClass.validation";

registerRoute<AddSessionForClassRouteConfig>()({
  path: "/sessions",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addSessionForClassValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SESSION },
  controller: AddSessionForClassController,
  isTransactionEnabled: false,
  platform: "web",
});
