import { CambridgeAveragesOfClassDTO } from "../../../../../feature/examGrade/dto/cambridge/CambridgeAveragesOfClass.dto";
import { GetCambridgeAveragesOfClassValidation } from "./getCambridgeAveragesOfClass.validation";

export type GetCambridgeAveragesOfClassRouteConfig = GetCambridgeAveragesOfClassValidation & {
  files: never;
};
export type GetCambridgeAveragesOfClassResponse = CambridgeAveragesOfClassDTO;
