import { ListSubLevelsValidation } from "./listSubLevels.validation";
import { SubLevel } from "../../../../../feature/subLevels/domains/subLevel.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";

export type ListSubLevelsRouteConfig = ListSubLevelsValidation & { files: never };
export type ListSubLevelsResponse = ResponseWithPagination<SubLevel>;
