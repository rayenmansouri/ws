import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetSecondaryChildGradeReportPDFController } from "./getSecondaryChildGradeReportPDF.controller";
import { GetSecondaryChildGradeReportPDFRouteConfig } from "./getSecondaryChildGradeReportPDF.types";
import { getSecondaryChildGradeReportPDFValidation } from "./getSecondaryChildGradeReportPDF.validation";

registerSharedRoute<GetSecondaryChildGradeReportPDFRouteConfig>()(
  {
    path: "/secondary/children/:childNewId/grade-report-pdf",
    method: "get",
    querySchema: getSecondaryChildGradeReportPDFValidation.query,
    paramSchema: getSecondaryChildGradeReportPDFValidation.params,
    controller: GetSecondaryChildGradeReportPDFController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["mobile", "web"],
    },
  ],
);
