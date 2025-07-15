import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { GetStudentAttendanceCertificateController } from "./getStudentAttendanceCertificate.controller";
import { GetStudentAttendanceCertificateRouteConfig } from "./getStudentAttendanceCertificate.types";
import { getStudentAttendanceCertificateValidation } from "./getStudentAttendanceCertificate.validation";

registerRoute<GetStudentAttendanceCertificateRouteConfig>()({
  path: "/students/:studentNewId/attendance-certificate",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  paramSchema: getStudentAttendanceCertificateValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.STUDENT },
  controller: GetStudentAttendanceCertificateController,
  isTransactionEnabled: false,
  platform: "web",
});
