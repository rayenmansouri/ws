import { HomeworkDTO } from "../../../../../feature/homeworks/dtos/homework.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListHomeworksByStudentValidation } from "./listHomeworksByStudent.validation";

export type ListHomeworksByStudentRouteConfig = ListHomeworksByStudentValidation & { files: never };
export type ListHomeworksByStudentResponse = ResponseWithPagination<HomeworkDTO>;
