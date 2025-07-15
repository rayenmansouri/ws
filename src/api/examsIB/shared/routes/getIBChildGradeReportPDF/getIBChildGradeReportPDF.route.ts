import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetIBChildGradeReportPDFController } from "./getIBChildGradeReportPDF.controller";
import { GetIBChildGradeReportPDFRouteConfig } from "./getIBChildGradeReportPDF.types";
import { getIBChildGradeReportPDFValidation } from "./getIBChildGradeReportPDF.validation";

registerSharedRoute<GetIBChildGradeReportPDFRouteConfig>()(
  {
    path: "/ib/children/:childNewId/grade-report-pdf",
    method: "get",
    querySchema: getIBChildGradeReportPDFValidation.query,
    paramSchema: getIBChildGradeReportPDFValidation.params,
    controller: GetIBChildGradeReportPDFController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["mobile", "web"],
    },
  ],
);
