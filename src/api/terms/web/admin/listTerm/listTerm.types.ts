import { Term } from "../../../../../feature/terms/domains/term.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListTermValidation } from "./listTerm.validation";

export type ListTermRouteConfig = ListTermValidation & { files: never };
export type ListTermResponse = ResponseWithPagination<Term>;
