import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListHomeworksByParentController } from "./listHomeworksByParent.controller";
import { ListHomeworksByParentRouteConfig } from "./listHomeworksByParent.types";
import { listHomeworksByParentValidation } from "./listHomeworksByParent.validation";

registerSharedRoute<ListHomeworksByParentRouteConfig>()(
  {
    path: "/students/:studentNewId/homeworks",
    method: "get",
    querySchema: listHomeworksByParentValidation.query,
    paramSchema: listHomeworksByParentValidation.params,
    controller: ListHomeworksByParentController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
  ],
);
