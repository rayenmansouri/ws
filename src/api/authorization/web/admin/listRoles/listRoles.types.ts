import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ID } from "../../../../../types/BaseEntity";
import { ListRolesValidation } from "./listRoles.validation";

export type ListRolesRouteConfig = ListRolesValidation & { files: never };
export type ListRolesResponse = ResponseWithPagination<{
  _id: ID;
  newId: string;
  name: string;
}>;
