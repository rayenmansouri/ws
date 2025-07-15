import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListTargetUsersForGroupConversationAssignmentController } from "./listTargetUsersForGroupConversationAssignment.controller";
import { ListTargetUsersForGroupConversationAssignmentRouteConfig } from "./listTargetUsersForGroupConversationAssignment.types";
import { listTargetUsersForGroupConversationAssignmentValidation } from "./listTargetUsersForGroupConversationAssignment.validation";

registerSharedRoute<ListTargetUsersForGroupConversationAssignmentRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/target-users",
    method: "get",
    querySchema: listTargetUsersForGroupConversationAssignmentValidation.query,
    paramSchema: listTargetUsersForGroupConversationAssignmentValidation.params,
    controller: ListTargetUsersForGroupConversationAssignmentController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
    },
  ],
);
