import { AdminDashboardDTO } from "../../../../../feature/dashboards/dtos/AdminDashboard.dto";
import { GetDashboardValidation } from "./getDashboard.validation";

export type GetDashboardRouteConfig = GetDashboardValidation & { files: never };

export type GetDashboardResponse = AdminDashboardDTO;
