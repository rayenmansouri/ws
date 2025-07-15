import { HomeworkDTO } from "../../../../../feature/homeworks/dtos/homework.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListHomeworksValidation } from "./listHomeworks.validation";

export type ListHomeworksRouteConfig = ListHomeworksValidation & { files: never };
export type ListHomeworksResponse = ResponseWithPagination<HomeworkDTO>;
