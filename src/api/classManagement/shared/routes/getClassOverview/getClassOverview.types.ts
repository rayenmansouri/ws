import { ClassOverviewDTO } from "../../../../../feature/classes/dto/ClassOverview.dto";
import { GetClassOverviewValidation } from "./getClassOverview.validation";

export type GetClassOverviewRouteConfig = GetClassOverviewValidation & { files: never };
export type GetClassOverviewResponse = ClassOverviewDTO;
