import { FinanceDashboardDto } from "../../../../../feature/finance/dtos/financeDashboard.dto";
import { GetFinanceDashboardValidation } from "./getFinanceDashboard.validation";

export type GetFinanceDashboardRouteConfig = GetFinanceDashboardValidation & { files: never };
export type GetFinanceDashboardResponse = FinanceDashboardDto;
