import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetScheduleController } from "./getSchedule.controller";
import { GetScheduleRouteConfig } from "./getSchedule.types";
import { getScheduleValidation } from "./getSchedule.validation";

registerSharedRoute<GetScheduleRouteConfig>()(
  {
    path: "/schedule",
    method: "get",
    querySchema: getScheduleValidation.query,
    controller: GetScheduleController,
    isTransactionEnabled: false,
  },
  [
    { endUser: END_USER_ENUM.ADMIN, platforms: ["web"] },
    { endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.PARENT, platforms: ["web", "mobile"] },
    { endUser: END_USER_ENUM.STUDENT, platforms: ["web", "mobile"] },
  ],
);
