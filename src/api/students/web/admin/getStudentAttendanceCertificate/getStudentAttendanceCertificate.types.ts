import { AttendanceCertificateDTO } from "../../../../../feature/students/dtos/AttendanceCertficate.dto";
import { GetStudentAttendanceCertificateValidation } from "./getStudentAttendanceCertificate.validation";

export type GetStudentAttendanceCertificateRouteConfig =
  GetStudentAttendanceCertificateValidation & { files: never };
export type GetStudentAttendanceCertificateResponse = AttendanceCertificateDTO;
