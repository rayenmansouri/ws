import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetPrimaryGradeReportStatsController } from "./getPrimaryGradeReportStats.controller";
import { GetPrimaryGradeReportStatsRouteConfig } from "./getPrimaryGradeReportStats.types";
import { getPrimaryGradeReportStatsValidation } from "./getPrimaryGradeReportStats.validation";

registerRoute<GetPrimaryGradeReportStatsRouteConfig>()({
  path: "/primary/classes/:classNewId/grade-report-stats",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: getPrimaryGradeReportStatsValidation.query,
  paramSchema: getPrimaryGradeReportStatsValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.EXAM_GRADE },
  controller: GetPrimaryGradeReportStatsController,
  isTransactionEnabled: false,
  platform: "web",
});
