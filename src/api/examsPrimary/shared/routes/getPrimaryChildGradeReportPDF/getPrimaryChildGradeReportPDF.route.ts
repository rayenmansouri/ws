import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetPrimaryChildGradeReportPDFController } from "./getPrimaryChildGradeReportPDF.controller";
import { GetPrimaryChildGradeReportPDFRouteConfig } from "./getPrimaryChildGradeReportPDF.types";
import { getPrimaryChildGradeReportPDFValidation } from "./getPrimaryChildGradeReportPDF.validation";

registerSharedRoute<GetPrimaryChildGradeReportPDFRouteConfig>()(
  {
    path: "/primary/children/:childNewId/grade-report-pdf",
    method: "get",
    querySchema: getPrimaryChildGradeReportPDFValidation.query,
    paramSchema: getPrimaryChildGradeReportPDFValidation.params,
    controller: GetPrimaryChildGradeReportPDFController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["mobile", "web"],
    },
  ],
);
