import { UserDashboardDTO } from "../../../../../feature/dashboards/dtos/UserDashboard.dto";
import { GetDashboardValidation } from "./getDashboard.validation";

export type GetDashboardRouteConfig = GetDashboardValidation & { files: never };
export type GetDashboardResponse = UserDashboardDTO;
