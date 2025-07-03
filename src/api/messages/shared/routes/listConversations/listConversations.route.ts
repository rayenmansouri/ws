import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListConversationsController } from "./listConversations.controller";
import { ListConversationsRouteConfig } from "./listConversations.types";
import { listConversationsValidation } from "./listConversations.validation";

registerSharedRoute<ListConversationsRouteConfig>()(
  {
    path: "/conversations",
    method: "get",
    querySchema: listConversationsValidation.query,
    controller: ListConversationsController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.PARENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
  ],
);
