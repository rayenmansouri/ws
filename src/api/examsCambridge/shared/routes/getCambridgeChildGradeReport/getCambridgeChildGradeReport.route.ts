import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetCambridgeChildGradeReportController } from "./getCambridgeChildGradeReport.controller";
import { GetCambridgeChildGradeReportRouteConfig } from "./getCambridgeChildGradeReport.types";
import { getCambridgeChildGradeReportValidation } from "./getCambridgeChildGradeReport.validation";

registerSharedRoute<GetCambridgeChildGradeReportRouteConfig>()(
  {
    path: "/cambridge/children/:childNewId/grade-reports",
    method: "get",
    querySchema: getCambridgeChildGradeReportValidation.query,
    paramSchema: getCambridgeChildGradeReportValidation.params,
    controller: GetCambridgeChildGradeReportController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
