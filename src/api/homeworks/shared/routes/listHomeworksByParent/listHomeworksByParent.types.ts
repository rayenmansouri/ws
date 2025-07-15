import { HomeworkDTO } from "../../../../../feature/homeworks/dtos/homework.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListHomeworksByParentValidation } from "./listHomeworksByParent.validation";

export type ListHomeworksByParentRouteConfig = ListHomeworksByParentValidation & { files: never };
export type ListHomeworksByParentResponse = ResponseWithPagination<HomeworkDTO>;
