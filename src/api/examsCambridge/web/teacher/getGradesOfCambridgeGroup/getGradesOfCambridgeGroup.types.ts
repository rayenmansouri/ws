import { GradesOfCambridgeSubjectDTO } from "../../../../../feature/examGrade/dto/cambridge/GradesOfCambridgeSubject.dto";
import { GetGradesOfCambridgeGroupValidation } from "./getGradesOfCambridgeGroup.validation";

export type GetGradesOfCambridgeGroupRouteConfig = GetGradesOfCambridgeGroupValidation & {
  files: never;
};
export type GetGradesOfCambridgeGroupResponse = GradesOfCambridgeSubjectDTO;
