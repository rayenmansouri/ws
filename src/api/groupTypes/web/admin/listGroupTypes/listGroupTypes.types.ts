import { GroupTypeDto } from "../../../../../feature/groupType/dtos/groupType.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListGroupTypesValidation } from "./listGroupTypes.validation";

export type ListGroupTypesRouteConfig = ListGroupTypesValidation & {
  files: never;
};
export type ListGroupTypesResponse = ResponseWithPagination<GroupTypeDto>;
