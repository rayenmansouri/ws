import { StudentDiplomaDTO } from "../../../../../feature/examGrade/dto/StudentDiploma.dto";
import { GetStudentDiplomaValidation } from "./getStudentDiploma.validation";

export type GetStudentDiplomaRouteConfig = GetStudentDiplomaValidation & { files: never };
export type GetStudentDiplomaResponse = StudentDiplomaDTO;
