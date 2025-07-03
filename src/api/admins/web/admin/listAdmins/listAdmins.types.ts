import { AdminDTO } from "../../../../../feature/admins/dtos/Admin.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListAdminsValidation } from "./listAdmins.validation";

export type ListAdminsRouteConfig = ListAdminsValidation & { files: never };
export type ListAdminsResponse = ResponseWithPagination<AdminDTO>;
