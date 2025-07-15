import { AlertDto } from "../../../../../feature/alertManagement/dto/alert.dto";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListAlertsValidation } from "./listAlerts.validation";

export type ListAlertsRouteConfig = ListAlertsValidation & { files: never };
export type ListAlertsResponse = ResponseWithPagination<AlertDto>;
