import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetOneConversationMessagesController } from "./getOneConversationMessages.controller";
import { GetOneConversationMessagesRouteConfig } from "./getOneConversationMessages.types";
import { getOneConversationMessagesValidation } from "./getOneConversationMessages.validation";

registerSharedRoute<GetOneConversationMessagesRouteConfig>()(
  {
    path: "/conversation",
    method: "post",
    bodySchema: getOneConversationMessagesValidation.body,
    controller: GetOneConversationMessagesController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.TEACHER,
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
  ],
);
