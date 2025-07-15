import { ClassTypeDto } from "../../../../../feature/classTypes/dtos/classType.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListClassTypesValidation } from "./listClassTypes.validation";

export type ListClassTypesRouteConfig = ListClassTypesValidation & { files: never };
export type ListClassTypesResponse = ResponseWithPagination<ClassTypeDto>;
