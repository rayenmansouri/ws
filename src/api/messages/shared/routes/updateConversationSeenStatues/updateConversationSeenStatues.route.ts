import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateConversationSeenStatuesController } from "./updateConversationSeenStatues.controller";
import { UpdateConversationSeenStatuesRouteConfig } from "./updateConversationSeenStatues.types";
import { updateConversationSeenStatuesValidation } from "./updateConversationSeenStatues.validation";

registerSharedRoute<UpdateConversationSeenStatuesRouteConfig>()(
  {
    path: "/conversations/:conversationId/seen",
    method: "patch",
    paramSchema: updateConversationSeenStatuesValidation.params,
    controller: UpdateConversationSeenStatuesController,
    isTransactionEnabled: false,
  },
  [
    {
      endUser: END_USER_ENUM.ADMIN,
      platforms: ["web"],
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
