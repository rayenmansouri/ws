import { TeacherProfileDTO } from "../../../../../feature/teachers/dtos/TeacherProfile.dto";
import { GetTeacherProfileValidation } from "./getTeacherProfile.validation";

export type GetTeacherProfileRouteConfig = GetTeacherProfileValidation & { files: never };
export type GetTeacherProfileResponse = TeacherProfileDTO;
