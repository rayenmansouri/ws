import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListConversationParticipantsController } from "./listConversationParticipants.controller";
import { ListConversationParticipantsRouteConfig } from "./listConversationParticipants.types";
import { listConversationParticipantsValidation } from "./listConversationParticipants.validation";

registerSharedRoute<ListConversationParticipantsRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/participants",
    method: "get",
    querySchema: listConversationParticipantsValidation.query,
    paramSchema: listConversationParticipantsValidation.params,
    controller: ListConversationParticipantsController,
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
