import { MasterDTO } from "../../../../../feature/masters/dtos/master.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListMastersValidation } from "./listMasters.validation";

export type ListMastersRouteConfig = ListMastersValidation & { files: never };
export type ListMastersResponse = ResponseWithPagination<MasterDTO>;
