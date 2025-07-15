import { SchoolDTO } from "../../../../../feature/schools/dtos/School.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSchoolsValidation } from "./listSchools.validation";

export type ListSchoolsRouteConfig = ListSchoolsValidation & { files: never };
export type ListSchoolsResponse = ResponseWithPagination<SchoolDTO>;
