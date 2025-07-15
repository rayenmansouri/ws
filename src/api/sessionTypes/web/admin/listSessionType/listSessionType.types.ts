import { SessionType } from "../../../../../feature/sessionTypes/domains/sessionType.entity";
import { ResponseWithPagination } from "../../../../../newDatabase/mongo/types";
import { ListSessionTypeValidation } from "./listSessionType.validation";

export type ListSessionTypeRouteConfig = ListSessionTypeValidation & { files: never };
export type ListSessionTypeResponse = ResponseWithPagination<SessionType>;
