import { FilesInRequest } from "../../../../../types/app-request";
import { AddTeacherValidation } from "./addTeacher.validation";

export type AddTeacherRouteConfig = AddTeacherValidation & { files: FilesInRequest<"avatar"> };
export type AddTeacherResponse = void;
