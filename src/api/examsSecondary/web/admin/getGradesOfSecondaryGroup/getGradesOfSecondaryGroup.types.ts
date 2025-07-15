import { GradesOfSecondarySubjectDTO } from "../../../../../feature/examGrade/dto/secondary/GradesOfSecondarySubject.dto";
import { GetGradesOfSecondaryGroupValidation } from "./getGradesOfSecondaryGroup.validation";

export type GetGradesOfSecondaryGroupRouteConfig = GetGradesOfSecondaryGroupValidation & {
  files: never;
};
export type GetGradesOfSecondaryGroupResponse = GradesOfSecondarySubjectDTO;
