import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetOneConversationController } from "./getOneConversation.controller";
import { GetOneConversationRouteConfig } from "./getOneConversation.types";
import { getOneConversationValidation } from "./getOneConversation.validation";

registerSharedRoute<GetOneConversationRouteConfig>()(
  {
    path: "/conversations/:conversationNewId",
    method: "get",
    paramSchema: getOneConversationValidation.params,
    controller: GetOneConversationController,
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
