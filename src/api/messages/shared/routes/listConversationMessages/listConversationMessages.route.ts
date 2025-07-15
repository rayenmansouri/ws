import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListConversationMessagesController } from "./listConversationMessages.controller";
import { ListConversationMessagesRouteConfig } from "./listConversationMessages.types";
import { listConversationMessagesValidation } from "./listConversationMessages.validation";

registerSharedRoute<ListConversationMessagesRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/messages",
    method: "get",
    paramSchema: listConversationMessagesValidation.params,
    querySchema: listConversationMessagesValidation.query,
    controller: ListConversationMessagesController,
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
