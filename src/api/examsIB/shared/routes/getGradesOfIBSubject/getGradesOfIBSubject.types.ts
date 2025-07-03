import { GradesOfIBSubjectDTO } from "../../../../../feature/examGrade/dto/ib/GradesOfIBSubject.dto";
import { GetGradesOfIBSubjectValidation } from "./getGradesOfIBSubject.validation";

export type GetGradesOfIBSubjectRouteConfig = GetGradesOfIBSubjectValidation & { files: never };
export type GetGradesOfIBSubjectResponse = GradesOfIBSubjectDTO;
