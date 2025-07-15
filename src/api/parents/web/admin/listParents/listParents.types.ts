import { ParentDTO } from "../../../../../feature/parents/dtos/Parent.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListParentsValidation } from "./listParents.validation";

export type ListParentsRouteConfig = ListParentsValidation & { files: never };
export type ListParentsResponse = ResponseWithPagination<ParentDTO>;
