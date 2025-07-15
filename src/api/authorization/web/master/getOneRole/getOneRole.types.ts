import { RoleDTO } from "../../../../../feature/authorization/dtos/Role.dto";
import { GetOneRoleValidation } from "./getOneRole.validation";

export type GetOneRoleRouteConfig = GetOneRoleValidation & { files: never };
export type GetOneRoleResponse = RoleDTO;
