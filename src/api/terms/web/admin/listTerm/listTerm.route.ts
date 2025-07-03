import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListTermController } from "./listTerm.controller";
import { ListTermRouteConfig } from "./listTerm.types";
import { listTermValidation } from "./listTerm.validation";

registerRoute<ListTermRouteConfig>()({
  path: "/terms",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listTermValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.TERM },
  controller: ListTermController,
  isTransactionEnabled: false,
  platform: "web",
});
