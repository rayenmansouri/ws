import { HomeworkDTO } from "../../../../../feature/homeworks/dtos/homework.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListHomeworksByTeacherValidation } from "./listHomeworksByTeacher.validation";

export type ListHomeworksByTeacherRouteConfig = ListHomeworksByTeacherValidation & { files: never };
export type ListHomeworksByTeacherResponse = ResponseWithPagination<HomeworkDTO>;
