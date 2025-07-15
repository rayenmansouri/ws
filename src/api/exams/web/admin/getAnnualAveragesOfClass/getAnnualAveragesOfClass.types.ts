import { AnnualAveragesOfClassDTO } from "../../../../../feature/examGrade/dto/AnnualAveragesOfClass.dto";
import { GetAnnualAveragesOfClassValidation } from "./getAnnualAveragesOfClass.validation";

export type GetAnnualAveragesOfClassRouteConfig = GetAnnualAveragesOfClassValidation & {
  files: never;
};
export type GetAnnualAveragesOfClassResponse = AnnualAveragesOfClassDTO;
