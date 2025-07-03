import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetCambridgeChildGradeReportPDFController } from "./getCambridgeChildGradeReportPDF.controller";
import { GetCambridgeChildGradeReportPDFRouteConfig } from "./getCambridgeChildGradeReportPDF.types";
import { getCambridgeChildGradeReportPDFValidation } from "./getCambridgeChildGradeReportPDF.validation";

registerSharedRoute<GetCambridgeChildGradeReportPDFRouteConfig>()(
  {
    path: "/cambridge/children/:childNewId/grade-report-pdf",
    method: "get",
    querySchema: getCambridgeChildGradeReportPDFValidation.query,
    paramSchema: getCambridgeChildGradeReportPDFValidation.params,
    controller: GetCambridgeChildGradeReportPDFController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["mobile", "web"],
    },
  ],
);
