import { HomeworkDTO } from "../../../../../feature/homeworks/dtos/homework.dto";
import { GetOneHomeworkValidation } from "./getOneHomework.validation";

export type GetOneHomeworkRouteConfig = GetOneHomeworkValidation & { files: never };
export type GetOneHomeworkResponse = HomeworkDTO;
