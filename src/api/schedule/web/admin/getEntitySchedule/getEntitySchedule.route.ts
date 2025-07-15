import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetEntityScheduleController } from "./getEntitySchedule.controller";
import { GetEntityScheduleRouteConfig } from "./getEntitySchedule.types";
import { getEntityScheduleValidation } from "./getEntitySchedule.validation";

registerRoute<GetEntityScheduleRouteConfig>()({
  path: "/schedule/entity",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getEntityScheduleValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SCHEDULE },
  controller: GetEntityScheduleController,
  isTransactionEnabled: false,
  platform: "web",
});
