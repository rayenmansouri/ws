import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ID } from "../../../../../types/BaseEntity";
import { ListClassesValidation } from "./listClasses.validation";

export type ListClassesRouteConfig = ListClassesValidation & { files: never };
export type ListClassesResponse = ResponseWithPagination<{
  _id: ID;
  name: string;
  newId: string;
}>;
