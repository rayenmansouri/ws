import { SubjectType } from "../../../../../feature/subjectTypes/domains/subjectType.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSubjectTypesValidation } from "./listSubjectTypes.validation";

export type ListSubjectTypesRouteConfig = ListSubjectTypesValidation & { files: never };
export type ListSubjectTypesResponse = ResponseWithPagination<SubjectType>;
