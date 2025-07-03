import { ClassTypeDto } from "../../../../../feature/classTypes/dtos/classType.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListNextClassTypesValidation } from "./listNextClassTypes.validation";

export type ListNextClassTypesRouteConfig = ListNextClassTypesValidation & { files: never };
export type ListNextClassTypesResponse = ResponseWithPagination<ClassTypeDto>;
