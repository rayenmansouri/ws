import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateWeeklySessionForClassController } from "./updateWeeklySessionForClass.controller";
import { UpdateWeeklySessionForClassRouteConfig } from "./updateWeeklySessionForClass.types";
import { updateWeeklySessionForClassValidation } from "./updateWeeklySessionForClass.validation";

registerRoute<UpdateWeeklySessionForClassRouteConfig>()({
  path: "/class/weekly-sessions/:weeklySessionNewId",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateWeeklySessionForClassValidation.body,
  paramSchema: updateWeeklySessionForClassValidation.params,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SCHEDULE },
  controller: UpdateWeeklySessionForClassController,
  isTransactionEnabled: false,
  platform: "web",
});
