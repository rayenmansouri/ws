import { ACTION_ENUM, RESOURCES_ENUM } from "../../../../../constants/ActionsResource";
import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListIssueReasonsController } from "./listIssueReasons.controller";
import { ListIssueReasonsRouteConfig } from "./listIssueReasons.types";
import { listIssueReasonsValidation } from "./listIssueReasons.validation";

registerSharedRoute<ListIssueReasonsRouteConfig>()(
  {
    path: "/issue-reasons",
    method: "get",
    querySchema: listIssueReasonsValidation.query,
    controller: ListIssueReasonsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
      authorization: { action: ACTION_ENUM.VIEW, resource: RESOURCES_ENUM.ISSUE },
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
