import { END_USER_ENUM } from "../../../../../constants/globalEnums";
import { registerSharedRoute } from "../../../../../core/express/registerSharedRoute";
import { GetMessageReactionsController } from "./GetMessageReactions.controller";
import { GetMessageReactionsRouteConfig } from "./GetMessageReactions.types";
import { GetMessageReactionsValidation } from "./GetMessageReactions.validation";

registerSharedRoute<GetMessageReactionsRouteConfig>()(
  {
    path: "/messages/:messageNewId/reactions",
    method: "get",
    paramSchema: GetMessageReactionsValidation.params,
    controller: GetMessageReactionsController,
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
