import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetIBChildGradeReportController } from "./getIBChildGradeReport.controller";
import { GetIBChildGradeReportRouteConfig } from "./getIBChildGradeReport.types";
import { getIBChildGradeReportValidation } from "./getIBChildGradeReport.validation";

registerRoute<GetIBChildGradeReportRouteConfig>()({
  path: "/ib/children/:childNewId/grade-reports",
  method: "get",
  endUser: END_USER_ENUM.PARENT,
  querySchema: getIBChildGradeReportValidation.query,
  paramSchema: getIBChildGradeReportValidation.params,
  controller: GetIBChildGradeReportController,
  isTransactionEnabled: false,
  platform: "mobile",
});
