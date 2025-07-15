import { SecondarySubjectsOfClassDTO } from "../../../../../feature/examGrade/dto/secondary/SecondarySubjectsOfClass.dto";
import { GetSecondarySubjectsOfClassValidation } from "./getSecondarySubjectsOfClass.validation";

export type GetSecondarySubjectsOfClassRouteConfig = GetSecondarySubjectsOfClassValidation & {
  files: never;
};
export type GetSecondarySubjectsOfClassResponse = SecondarySubjectsOfClassDTO;
