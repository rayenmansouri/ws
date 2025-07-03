import { ClassroomDTO } from "../../../../../feature/classrooms/dtos/Classroom.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";
import { ListClassroomsValidation } from "./listClassrooms.validation";

export type ListClassroomsRouteConfig = ListClassroomsValidation & { files: never };
export type ListClassroomsResponse = ResponseWithPagination<ClassroomDTO>;
