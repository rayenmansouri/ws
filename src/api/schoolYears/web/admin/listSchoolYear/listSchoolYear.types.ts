import { SchoolYear } from "../../../../../feature/schoolYears/domain/schoolYear.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSchoolYearValidation } from "./listSchoolYear.validation";

export type ListSchoolYearRouteConfig = ListSchoolYearValidation & { files: never };
export type ListSchoolYearResponse = ResponseWithPagination<SchoolYear>;
