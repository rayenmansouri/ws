import { TutorialDto } from "../../../../../feature/tutorial/dtos/tutorial.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListTutorialsValidation } from "./listTutorials.validation";

export type ListTutorialsRouteConfig = ListTutorialsValidation & { files: never };
export type ListTutorialsResponse = ResponseWithPagination<TutorialDto>;
