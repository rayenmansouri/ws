import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ID } from "../../../../../types/BaseEntity";
import { ListLevelsValidation } from "./listLevels.validation";

export type ListLevelsRouteConfig = ListLevelsValidation & { files: never };
export type ListLevelsResponse = ResponseWithPagination<{ _id: ID; newId: string; name: string }>;
