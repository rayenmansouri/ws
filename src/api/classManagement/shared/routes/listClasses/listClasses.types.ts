import { ClassDTO } from "../../../../../feature/classes/dto/Classes.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListClassesValidation } from "./listClasses.validation";

export type ListClassesRouteConfig = ListClassesValidation & { files: never };
export type ListClassesResponse = ResponseWithPagination<ClassDTO>;
