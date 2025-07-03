import { ImportStudentsValidation } from "./importStudents.validation";

export type ImportStudentsRouteConfig = ImportStudentsValidation & { files: never };
export type ImportStudentsResponse = void;
