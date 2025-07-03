import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ID } from "../../../../../types/BaseEntity";
import { ListClassTypesValidation } from "./listClassTypes.validation";

export type ListClassTypesRouteConfig = ListClassTypesValidation & { files: never };
export type ListClassTypesResponse = ResponseWithPagination<{
  _id: ID;
  newId: string;
  name: string;
}>;
