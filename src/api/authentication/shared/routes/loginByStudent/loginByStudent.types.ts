import { SchoolDTO } from "../../../../../feature/schools/dtos/School.dto";
import { UserProfileDTO } from "../../../../../feature/users/dtos/userProfile.dto";
import { LoginByStudentValidation } from "./loginByStudent.validation";

export type LoginByStudentRouteConfig = LoginByStudentValidation & { files: never };
export type LoginByStudentResponse =
  | { token: string; user: UserProfileDTO; isActive: true; school: null }
  | { token: null; user: null; isActive: false; school: SchoolDTO };
