import { DashboardResponse } from "./../../../../../feature/admins/useCases/getDashboard.usecase";
import { GetDashboardValidation } from "./getDashboard.validation";

export type GetDashboardRouteConfig = GetDashboardValidation & { files: never };

export type TabName = "attendance" | "observationGiven" | "sessionCanceled";

export type GetDashboardResponse = DashboardResponse;
