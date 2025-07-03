import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { ListConversationLinksController } from "./listConversationLinks.controller";
import { ListConversationLinksRouteConfig } from "./listConversationLinks.types";
import { listConversationLinksValidation } from "./listConversationLinks.validation";

registerSharedRoute<ListConversationLinksRouteConfig>()(
  {
    path: "/conversations/:conversationNewId/links",
    method: "get",
    paramSchema: listConversationLinksValidation.params,
    querySchema: listConversationLinksValidation.query,
    controller: ListConversationLinksController,
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
