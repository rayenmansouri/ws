import { SmsSoldHistoryResponseDto } from "./../../../../../feature/alertManagement/dto/alert.dto";
import { ResponseWithPagination } from "./../../../../../newDatabase/mongo/types";

import { ListSmsSoldHistoriesValidation } from "./listSmsSoldHistories.validation";

export type ListSmsSoldHistoriesRouteConfig = ListSmsSoldHistoriesValidation & { files: never };
export type ListSmsSoldHistoriesResponse = ResponseWithPagination<SmsSoldHistoryResponseDto>;
