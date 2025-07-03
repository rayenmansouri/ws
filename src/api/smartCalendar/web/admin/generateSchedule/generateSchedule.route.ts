import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GenerateScheduleController } from "./generateSchedule.controller";
import { GenerateScheduleRouteConfig } from "./generateSchedule.types";
import { generateScheduleValidation } from "./generateSchedule.validation";

registerRoute<GenerateScheduleRouteConfig>()({
  path: "/smart-calendar-schedules/generate",
  method: "post",
  endUser: END_USER_ENUM.ADMIN,
  bodySchema: generateScheduleValidation.body,
  authorization: { action: ACTION_ENUM.ADD, resource: RESOURCES_ENUM.SMART_CALENDAR },
  controller: GenerateScheduleController,
  isTransactionEnabled: true,
  platform: "web",
});
