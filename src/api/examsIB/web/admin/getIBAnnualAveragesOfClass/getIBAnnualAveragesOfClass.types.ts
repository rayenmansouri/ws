import { IBAnnualAveragesOfClassDTO } from "../../../../../feature/examGrade/dto/ib/IBAnnualAveragesOfClass.dto";
import { GetIBAnnualAveragesOfClassValidation } from "./getIBAnnualAveragesOfClass.validation";

export type GetIBAnnualAveragesOfClassRouteConfig = GetIBAnnualAveragesOfClassValidation & {
  files: never;
};
export type GetIBAnnualAveragesOfClassResponse = IBAnnualAveragesOfClassDTO;
