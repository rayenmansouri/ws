import { StudentProfileDTO } from "../../../../../feature/students/dtos/StudentProfile.dto";
import { GetStudentProfileValidation } from "./getStudentProfile.validation";

export type GetStudentProfileRouteConfig = GetStudentProfileValidation & { files: never };
export type GetStudentProfileResponse = StudentProfileDTO;
