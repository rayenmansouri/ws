import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListGroupsController } from "./listGroups.controller";
import { ListGroupsRouteConfig } from "./listGroups.types";
import { listGroupsValidation } from "./listGroups.validation";

registerSharedRoute<ListGroupsRouteConfig>()(
  {
    path: "/list/groups",
    method: "get",
    querySchema: listGroupsValidation.query,
    controller: ListGroupsController,
    isTransactionEnabled: false,
  },
  [{ endUser: END_USER_ENUM.TEACHER, platforms: ["web", "mobile"] }],
);
