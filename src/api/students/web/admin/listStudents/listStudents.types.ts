import { StudentDto } from "../../../../../feature/students/dtos/StudentList.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListStudentsValidation } from "./listStudents.validation";

export type ListStudentsRouteConfig = ListStudentsValidation & { files: never };
export type ListStudentsResponse = ResponseWithPagination<StudentDto>;
