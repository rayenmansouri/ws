import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetWeeklyScheduleController } from "./getWeeklySchedule.controller";
import { GetWeeklyScheduleRouteConfig } from "./getWeeklySchedule.types";
import { getWeeklyScheduleValidation } from "./getWeeklySchedule.validation";

registerSharedRoute<GetWeeklyScheduleRouteConfig>()(
  {
    path: "/weekly-schedule",
    method: "get",
    querySchema: getWeeklyScheduleValidation.query,
    controller: GetWeeklyScheduleController,
    isTransactionEnabled: false,
  },
  [{ endUser: END_USER_ENUM.ADMIN, platforms: ["web"] }],
);
