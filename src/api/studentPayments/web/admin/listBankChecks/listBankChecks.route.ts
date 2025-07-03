import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListBankChecksController } from "./listBankChecks.controller";
import { ListBankChecksRouteConfig } from "./listBankChecks.types";
import { listBankChecksValidation } from "./listBankChecks.validation";

registerRoute<ListBankChecksRouteConfig>()({
  path: "/bank-checks",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listBankChecksValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.BANK_CHECK },
  controller: ListBankChecksController,
  isTransactionEnabled: false,
  platform: "web",
});
