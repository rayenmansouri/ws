import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetSecondaryGradeReportStatsController } from "./getSecondaryGradeReportStats.controller";
import { GetSecondaryGradeReportStatsRouteConfig } from "./getSecondaryGradeReportStats.types";
import { getSecondaryGradeReportStatsValidation } from "./getSecondaryGradeReportStats.validation";

registerRoute<GetSecondaryGradeReportStatsRouteConfig>()({
  path: "/secondary/classes/:classNewId/grade-report-stats",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getSecondaryGradeReportStatsValidation.query,
  paramSchema: getSecondaryGradeReportStatsValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetSecondaryGradeReportStatsController,
  isTransactionEnabled: false,
  platform: "web",
});
