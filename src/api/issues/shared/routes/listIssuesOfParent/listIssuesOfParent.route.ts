import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListIssuesOfParentController } from "./listIssuesOfParent.controller";
import { ListIssuesOfParentRouteConfig } from "./listIssuesOfParent.types";
import { listIssuesOfParentValidation } from "./listIssuesOfParent.validation";

registerSharedRoute<ListIssuesOfParentRouteConfig>()(
  {
    path: "/issues",
    method: "get",
    querySchema: listIssuesOfParentValidation.query,
    controller: ListIssuesOfParentController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
