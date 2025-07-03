import { PrimaryAveragesOfClassDTO } from "../../../../../feature/examGrade/dto/primary/PrimaryAveragesOfClass.dto";
import { GetPrimaryAveragesOfClassValidation } from "./getPrimaryAveragesOfClass.validation";

export type GetPrimaryAveragesOfClassRouteConfig = GetPrimaryAveragesOfClassValidation & {
  files: never;
};
export type GetPrimaryAveragesOfClassResponse = PrimaryAveragesOfClassDTO;
