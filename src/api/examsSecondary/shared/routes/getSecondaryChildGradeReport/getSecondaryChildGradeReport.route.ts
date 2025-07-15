import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetSecondaryChildGradeReportController } from "./getSecondaryChildGradeReport.controller";
import { GetSecondaryChildGradeReportRouteConfig } from "./getSecondaryChildGradeReport.types";
import { getSecondaryChildGradeReportValidation } from "./getSecondaryChildGradeReport.validation";

registerSharedRoute<GetSecondaryChildGradeReportRouteConfig>()(
  {
    path: "/secondary/children/:childNewId/grade-reports",
    method: "get",
    querySchema: getSecondaryChildGradeReportValidation.query,
    paramSchema: getSecondaryChildGradeReportValidation.params,
    controller: GetSecondaryChildGradeReportController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
