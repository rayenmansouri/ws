import { StudentInClassDto } from "../../../../../feature/classes/dto/StudentInClass.dto";
import { GetStudentsOfClassValidation } from "./getStudentsOfClass.validation";

export type GetStudentsOfClassRouteConfig = GetStudentsOfClassValidation & { files: never };
export type GetStudentsOfClassResponse = StudentInClassDto[];
