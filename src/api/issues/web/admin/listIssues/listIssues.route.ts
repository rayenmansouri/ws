import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerRoute } from "../../../../../core/express/registerRoute";
import { ListIssuesController } from "./listIssues.controller";
import { ListIssuesRouteConfig } from "./listIssues.types";
import { listIssuesValidation } from "./listIssues.validation";

registerRoute<ListIssuesRouteConfig>()({
  path: "/issues",
  method: "get",
  endUser: END_USER_ENUM.ADMIN,
  querySchema: listIssuesValidation.query,
  authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ISSUE },
  controller: ListIssuesController,
  isTransactionEnabled: false,
  platform: "web",
});
