import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetPrimaryChildGradeReportController } from "./getPrimaryChildGradeReport.controller";
import { GetPrimaryChildGradeReportRouteConfig } from "./getPrimaryChildGradeReport.types";
import { getPrimaryChildGradeReportValidation } from "./getPrimaryChildGradeReport.validation";

registerSharedRoute<GetPrimaryChildGradeReportRouteConfig>()(
  {
    path: "/primary/children/:childNewId/grade-reports",
    method: "get",
    querySchema: getPrimaryChildGradeReportValidation.query,
    paramSchema: getPrimaryChildGradeReportValidation.params,
    controller: GetPrimaryChildGradeReportController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
