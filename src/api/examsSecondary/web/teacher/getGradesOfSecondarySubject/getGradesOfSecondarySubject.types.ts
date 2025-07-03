import { GradesOfSecondarySubjectDTO } from "../../../../../feature/examGrade/dto/secondary/GradesOfSecondarySubject.dto";
import { GetGradesOfSecondarySubjectValidation } from "./getGradesOfSecondarySubject.validation";

export type GetGradesOfSecondarySubjectRouteConfig = GetGradesOfSecondarySubjectValidation & {
  files: never;
};
export type GetGradesOfSecondarySubjectResponse = GradesOfSecondarySubjectDTO;
