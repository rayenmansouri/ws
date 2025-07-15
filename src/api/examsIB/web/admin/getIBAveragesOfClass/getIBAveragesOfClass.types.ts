import { IBAveragesOfClassDTO } from "../../../../../feature/examGrade/dto/ib/IBAveragesOfClass.dto";
import { GetIBAveragesOfClassValidation } from "./getIBAveragesOfClass.validation";

export type GetIBAveragesOfClassRouteConfig = GetIBAveragesOfClassValidation & { files: never };
export type GetIBAveragesOfClassResponse = IBAveragesOfClassDTO;
