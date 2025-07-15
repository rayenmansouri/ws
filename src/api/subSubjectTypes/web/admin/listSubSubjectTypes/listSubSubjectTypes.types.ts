import { SubSubjectTypeDto } from "../../../../../feature/subSubjectTypes/dtos/subSubjectType.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSubSubjectTypesValidation } from "./listSubSubjectTypes.validation";

export type ListSubSubjectTypesRouteConfig = ListSubSubjectTypesValidation & { files: never };
export type ListSubSubjectTypesResponse = ResponseWithPagination<SubSubjectTypeDto>;
