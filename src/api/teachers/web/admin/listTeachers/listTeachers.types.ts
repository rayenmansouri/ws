import { TeacherDTO } from "../../../../../feature/teachers/dtos/Teacher.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListTeachersValidation } from "./listTeachers.validation";

export type ListTeachersRouteConfig = ListTeachersValidation & { files: never };
export type ListTeachersResponse = ResponseWithPagination<TeacherDTO>;
