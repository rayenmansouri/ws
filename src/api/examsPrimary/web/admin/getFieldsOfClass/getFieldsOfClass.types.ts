import { ExamFieldListDTO } from "../../../../../feature/examGrade/dto/primary/FieldsOfClass.dto";
import { GetFieldsOfClassValidation } from "./getFieldsOfClass.validation";

export type GetFieldsOfClassRouteConfig = GetFieldsOfClassValidation & { files: never };
export type GetFieldsOfClassResponse = ExamFieldListDTO;
