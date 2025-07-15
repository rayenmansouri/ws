import { Service } from "../../../../../feature/studentPayments/domain/service.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListServicesValidation } from "./listServices.validation";

export type ListServicesRouteConfig = ListServicesValidation & { files: never };
export type ListServicesResponse = ResponseWithPagination<Service>;
