import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { UpdateNotAvailableTimesController } from "./updateNotAvailableTimes.controller";
import { UpdateNotAvailableTimesRouteConfig } from "./updateNotAvailableTimes.types";
import { updateNotAvailableTimesValidation } from "./updateNotAvailableTimes.validation";

registerRoute<UpdateNotAvailableTimesRouteConfig>()({
  path: "/constraints/available-times",
  method: "patch",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: updateNotAvailableTimesValidation.body,
  authorization: { action: ACTION_ENUM.EDIT, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: UpdateNotAvailableTimesController,
  isTransactionEnabled: false,
  platform: "web",
});
