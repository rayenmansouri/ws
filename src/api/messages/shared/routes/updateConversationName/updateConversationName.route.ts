import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { UpdateConversationNameController } from "./updateConversationName.controller";
import { UpdateConversationNameRouteConfig } from "./updateConversationName.types";
import { updateConversationNameValidation } from "./updateConversationName.validation";

registerSharedRoute<UpdateConversationNameRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/name",
    method: "patch",
    bodySchema: updateConversationNameValidation.body,
    paramSchema: updateConversationNameValidation.params,
    controller: UpdateConversationNameController,
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
      endUser: END_USER_ENUM.TEACHER,
      platforms: ["web", "mobile"],
    },
    {
      endUser: END_USER_ENUM.STUDENT,
      platforms: ["web", "mobile"],
    },
  ],
);
