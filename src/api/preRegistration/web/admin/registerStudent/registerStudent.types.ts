import { RegisterStudentValidation } from "./registerStudent.validation";

export type RegisterStudentRouteConfig = RegisterStudentValidation & { files: never };
export type RegisterStudentResponse = void;
