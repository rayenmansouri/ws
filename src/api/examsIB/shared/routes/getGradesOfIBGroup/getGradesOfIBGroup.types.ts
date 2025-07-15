import { GetGradesOfIBGroupValidation } from "./getGradesOfIBGroup.validation";
import { GradesOfIBSubjectDTO } from "../../../../../feature/examGrade/dto/ib/GradesOfIBSubject.dto";

export type GetGradesOfIBGroupRouteConfig = GetGradesOfIBGroupValidation & { files: never };
export type GetGradesOfIBGroupResponse = GradesOfIBSubjectDTO;
