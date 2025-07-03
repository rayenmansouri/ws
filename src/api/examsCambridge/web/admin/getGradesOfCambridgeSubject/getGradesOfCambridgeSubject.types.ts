import { GradesOfCambridgeSubjectDTO } from "../../../../../feature/examGrade/dto/cambridge/GradesOfCambridgeSubject.dto";
import { GetGradesOfCambridgeSubjectValidation } from "./getGradesOfCambridgeSubject.validation";

export type GetGradesOfCambridgeSubjectRouteConfig = GetGradesOfCambridgeSubjectValidation & {
  files: never;
};
export type GetGradesOfCambridgeSubjectResponse = GradesOfCambridgeSubjectDTO;
