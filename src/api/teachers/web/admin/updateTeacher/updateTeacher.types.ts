import { FilesInRequest } from "../../../../../types/app-request";
import { UpdateTeacherValidation } from "./updateTeacher.validation";

export type UpdateTeacherRouteConfig = UpdateTeacherValidation & {
  files: FilesInRequest<"avatar">;
};
export type UpdateTeacherResponse = void;
