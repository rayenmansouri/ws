import { RoleDTO } from "../../../../../feature/authorization/dtos/Role.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListRolesValidation } from "./listRoles.validation";

export type ListRolesRouteConfig = ListRolesValidation & { files: never };
export type ListRolesResponse = ResponseWithPagination<RoleDTO>;
