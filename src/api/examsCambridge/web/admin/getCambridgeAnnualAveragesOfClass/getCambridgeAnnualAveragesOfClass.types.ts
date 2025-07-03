import { CambridgeAnnualAveragesOfClassDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeAnnualAveragesOfClass.dto";
import { GetCambridgeAnnualAveragesOfClassValidation } from "./getCambridgeAnnualAveragesOfClass.validation";

export type GetCambridgeAnnualAveragesOfClassRouteConfig =
  GetCambridgeAnnualAveragesOfClassValidation & {
    files: never;
  };
export type GetCambridgeAnnualAveragesOfClassResponse = CambridgeAnnualAveragesOfClassDTO;
