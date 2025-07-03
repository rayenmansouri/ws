import { FilesInRequest } from "../../../../../types/app-request";
import { TAddStudentValidation } from "./addStudent.validation";

export type AddStudentRouteConfig = TAddStudentValidation & {
  files: FilesInRequest<"avatar">;
};
export type AddStudentResponse = void;
