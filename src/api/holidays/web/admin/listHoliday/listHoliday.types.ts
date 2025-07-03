import { HolidayDto } from "../../../../../feature/holidays/dto/Holiday.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListHolidayValidation } from "./listHoliday.validation";

export type ListHolidayRouteConfig = ListHolidayValidation & { files: never };
export type ListHolidayResponse = ResponseWithPagination<HolidayDto>;
