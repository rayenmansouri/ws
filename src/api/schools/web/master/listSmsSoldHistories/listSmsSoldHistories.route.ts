import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListSmsSoldHistoriesController } from "./listSmsSoldHistories.controller";
import { ListSmsSoldHistoriesRouteConfig } from "./listSmsSoldHistories.types";
import { listSmsSoldHistoriesValidation } from "./listSmsSoldHistories.validation";

registerRoute<ListSmsSoldHistoriesRouteConfig>()({
  path: "/tenants/:tenantId/sms-history",
  method: "get",
  endUser: END_USER_ENUM.MASTER,
  querySchema: listSmsSoldHistoriesValidation.query,
  paramSchema: listSmsSoldHistoriesValidation.params,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.SMS_HISTORY },
  controller: ListSmsSoldHistoriesController,
  isTransactionEnabled: false,
  platform: "web",
});
