import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetDraftWeeklyScheduleController } from "./getDraftWeeklySchedule.controller";
import { GetDraftWeeklyScheduleRouteConfig } from "./getDraftWeeklySchedule.types";
import { getDraftWeeklyScheduleValidation } from "./getDraftWeeklySchedule.validation";

registerRoute<GetDraftWeeklyScheduleRouteConfig>()({
  path: "/draft-weekly-schedule",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getDraftWeeklyScheduleValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SCHEDULE },
  controller: GetDraftWeeklyScheduleController,
  isTransactionEnabled: false,
  platform: "web",
});
