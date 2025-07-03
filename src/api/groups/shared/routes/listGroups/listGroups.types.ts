import { GroupDto } from "../../../../../feature/groupManagement/dtos/Group.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListGroupsValidation } from "./listGroups.validation";

export type ListGroupsRouteConfig = ListGroupsValidation & { files: never };
export type ListGroupsResponse = ResponseWithPagination<GroupDto>;
