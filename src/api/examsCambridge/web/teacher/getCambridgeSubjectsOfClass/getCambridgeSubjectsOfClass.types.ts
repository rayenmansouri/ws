import { CambridgeSubjectOfClassDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeSubjectOfClass.dto";
import { GetCambridgeSubjectsOfClassValidation } from "./getCambridgeSubjectsOfClass.validation";

export type GetCambridgeSubjectsOfClassRouteConfig = GetCambridgeSubjectsOfClassValidation & {
  files: never;
};
export type GetCambridgeSubjectsOfClassResponse = CambridgeSubjectOfClassDTO;
