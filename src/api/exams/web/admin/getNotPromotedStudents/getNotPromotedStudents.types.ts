import { NotPromotedStudentDTO } from "../../../../../feature/examGrade/dto/NotPromotedStudents.dto";
import { GetNotPromotedStudentsValidation } from "./getNotPromotedStudents.validation";

export type GetNotPromotedStudentsRouteConfig = GetNotPromotedStudentsValidation & {
  files: never;
};
export type GetNotPromotedStudentsResponse = NotPromotedStudentDTO;
