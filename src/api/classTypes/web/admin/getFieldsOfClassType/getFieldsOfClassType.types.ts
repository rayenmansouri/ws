import { FieldOfClassTypeDTO } from "../../../../../feature/classTypes/dtos/classType.dto";
import { GetFieldsOfClassTypeValidation } from "./getFieldsOfClassType.validation";

export type GetFieldsOfClassTypeRouteConfig = GetFieldsOfClassTypeValidation & { files: never };
export type GetFieldsOfClassTypeResponse = FieldOfClassTypeDTO[];
