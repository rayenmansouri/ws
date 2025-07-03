import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListConversationMultimediaController } from "./listConversationMultimedia.controller";
import { ListConversationMultimediaRouteConfig } from "./listConversationMultimedia.types";
import { listConversationMultimediaValidation } from "./listConversationMultimedia.validation";

registerSharedRoute<ListConversationMultimediaRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/multimedia",
    method: "get",
    querySchema: listConversationMultimediaValidation.query,
    paramSchema: listConversationMultimediaValidation.params,
    controller: ListConversationMultimediaController,
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
