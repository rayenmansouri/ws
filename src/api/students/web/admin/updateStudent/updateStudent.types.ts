import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateStudentValidation } from "./updateStudent.validation";

export type UpdateStudentRouteConfig = UpdateStudentValidation & {
  files: FilesInRequest<"avatar">;
};
export type UpdateStudentResponse = void;
