import { SecondaryAveragesOfClassDTO } from "../../../../../feature/examGrade/dto/secondary/SecondaryAveragesOfClass.dto";
import { GetSecondaryAveragesOfClassValidation } from "./getSecondaryAveragesOfClass.validation";

export type GetSecondaryAveragesOfClassRouteConfig = GetSecondaryAveragesOfClassValidation & {
  files: never;
};
export type GetSecondaryAveragesOfClassResponse = SecondaryAveragesOfClassDTO;
