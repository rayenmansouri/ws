import { ExamTypeDto } from "../../../../../feature/examTypes/dtos/ExamType.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListExamTypesValidation } from "./listExamTypes.validation";

export type ListExamTypesRouteConfig = ListExamTypesValidation & { files: never };
export type ListExamTypesResponse = ResponseWithPagination<ExamTypeDto>;
