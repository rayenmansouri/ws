import { Level } from "../../../../../feature/levels/domains/level.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListLevelsValidation } from "./listLevels.validation";

export type ListLevelsRouteConfig = ListLevelsValidation & { files: never };
export type ListLevelsResponse = ResponseWithPagination<Level>;
