import { StudentDiplomaDTO } from "../../../../../feature/examGrade/dto/StudentDiploma.dto";
import { GetClassDiplomasValidation } from "./getClassDiplomas.validation";

export type GetClassDiplomasRouteConfig = GetClassDiplomasValidation & { files: never };
export type GetClassDiplomasResponse = StudentDiplomaDTO[];
