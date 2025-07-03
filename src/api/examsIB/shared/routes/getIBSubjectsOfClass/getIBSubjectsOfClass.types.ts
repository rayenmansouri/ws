import { IBSubjectOfClassDTO } from "../../../../../feature/examGrade/dto/ib/IBSubjectOfClass.dto";
import { GetIBSubjectsOfClassValidation } from "./getIBSubjectsOfClass.validation";

export type GetIBSubjectsOfClassRouteConfig = GetIBSubjectsOfClassValidation & {
  files: never;
};
export type GetIBSubjectsOfClassResponse = IBSubjectOfClassDTO;
