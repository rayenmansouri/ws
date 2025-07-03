import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListInteractionsOfIssueController } from "./listInteractionsOfIssue.controller";
import { ListInteractionsOfIssueRouteConfig } from "./listInteractionsOfIssue.types";
import { listInteractionsOfIssueValidation } from "./listInteractionsOfIssue.validation";

registerSharedRoute<ListInteractionsOfIssueRouteConfig>()(
  {
    path: "/issues/:issueNewId/interactions",
    method: "get",
    querySchema: listInteractionsOfIssueValidation.query,
    paramSchema: listInteractionsOfIssueValidation.params,
    controller: ListInteractionsOfIssueController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
