import { EntityDto } from "../../../../../feature/entity/dto/entity.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListGroupsValidation } from "./listGroups.validation";

export type ListGroupsRouteConfig = ListGroupsValidation & { files: never };
export type ListGroupsResponse = ResponseWithPagination<EntityDto>;
