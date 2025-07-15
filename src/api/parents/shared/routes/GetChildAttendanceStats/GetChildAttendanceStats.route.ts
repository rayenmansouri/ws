import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetChildAttendanceStatsController } from "./GetChildAttendanceStats.controller";
import { GetChildAttendanceStatsRouteConfig } from "./GetChildAttendanceStats.types";
import { GetChildAttendanceStatsValidation } from "./GetChildAttendanceStats.validation";

registerSharedRoute<GetChildAttendanceStatsRouteConfig>()(
  {
    path: "/students/:studentNewId/attendance-stats",
    method: "get",
    querySchema: GetChildAttendanceStatsValidation.query,
    paramSchema: GetChildAttendanceStatsValidation.params,
    controller: GetChildAttendanceStatsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
