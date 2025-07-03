import { Diploma } from "../../../../../feature/diploma/diploma.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListDiplomasValidation } from "./listDiplomas.validation";

export type ListDiplomasRouteConfig = ListDiplomasValidation & { files: never };
export type ListDiplomasResponse = ResponseWithPagination<Diploma>;
