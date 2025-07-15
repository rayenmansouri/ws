import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { AddWeeklySessionForClassController } from "./addWeeklySessionForClass.controller";
import { AddWeeklySessionForClassRouteConfig } from "./addWeeklySessionForClass.types";
import { addWeeklySessionForClassValidation } from "./addWeeklySessionForClass.validation";

registerRoute<AddWeeklySessionForClassRouteConfig>()({
  path: "/class/weekly-sessions",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: addWeeklySessionForClassValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SCHEDULE },
  controller: AddWeeklySessionForClassController,
  isTransactionEnabled: false,
  platform: "web",
});
